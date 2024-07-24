'use client'

import useAxiosErrorToast from "@/hooks/useAxiosErrorToast";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import CardWakifList from "./card-wakif-list";
import { VscLoading } from "react-icons/vsc";

export type WakifItem = {
  user: {
    id: string;
    image: string | null;
    name: string | null;
  } | null;
  id: string;
  updatedAt: Date;
  name: string;
  isHiddenName: boolean;
  amount: number;
  message: string | null;
}

interface IProps {
  campaignId: number;
  data: WakifItem[];
  totalWakif: number;
  limit: number;
}

const WakifList: React.FC<IProps> = ({ campaignId, data, totalWakif, limit }) => {
  const [wakifList, setWakifList] = useState(data)
  const [wakifCount, setWakifCount] = useState(totalWakif)
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null)
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const { handleAxiosErrorToast } = useAxiosErrorToast()
  const observer = useRef<IntersectionObserver | null>()

  const fetch = useCallback(() => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    axios
      .get(`/api/user/campaign/${campaignId}/wakif-list`, {
        params: { cursor, limit: limit },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.wakif.length === limit) {
          setCursor(res.data.wakif[res.data.wakif.length - 1].id);
          if (!hasMore) setHasMore(true);
        } else {
          setHasMore(false);
        }
        setWakifList((prev) => [...prev, ...res.data.wakif]);
        setWakifCount(res.data.count);
      })
      .catch((error: AxiosError) => {
        setWakifList([]);
        setHasMore(false);
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            handleAxiosErrorToast(axiosError.response.status);
          } else {
            toast.error('Internal Error');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cursor]);

  const lastDataElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetch()
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="bg-background rounded-md shadow-sm p-4 space-y-4 sticky top-0">
      <div className="flex gap-2 items-center">
        <h2 className="text-lg sm:text-xl font-bold">
          Wakif
        </h2>
        <span className="inline-block rounded-full bg-secondary text-white px-3 py-[2px] text-sm">
          {wakifCount}
        </span>
      </div>
      <div className="space-y-4">
        {wakifList.length > 0 && wakifList.map((wakif, index) => {
          if (wakifList.length === index + 1 && hasMore) return (
            <CardWakifList
              key={wakif.id}
              ref={lastDataElementRef}
              data={wakif}
            />
          )

          return (
            <CardWakifList
              key={wakif.id}
              data={wakif}
            />
          )
        })}
        {data.length === 0 && (
          <p className="text-center mb-4">
            Belum ada wakif, ayo jadi yang pertama!
          </p>
        )}
        {loading && (
          <div className="p-4">
            <VscLoading fontSize={20} className="animate-spin mx-auto" />
          </div>
        )}
        {data.length > 0 && !hasMore && (
          <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
            Tidak ada lagi wakif
          </div>
        )}
      </div>
    </div>
  );
};

export default WakifList;
