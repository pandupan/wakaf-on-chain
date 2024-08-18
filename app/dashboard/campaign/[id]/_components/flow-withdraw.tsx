'use client'

import CardFlowWithdraw, { FlowWithdrawItem } from '@/components/shared/card-flow-withdraw';
import { Button } from '@/components/ui/button';
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import { useCallback, useRef, useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'sonner';

interface IProps {
  data: FlowWithdrawItem[];
  limit: number;
  campaignId: number;
}

function FlowWithdraw({ data, limit, campaignId }: IProps) {
  const [withdrawalRequests, setWithdrawalRequests] = useState(data)
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null)
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const { handleAxiosErrorToast } = useAxiosErrorToast()

  const fetch = useCallback(() => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    axios
      .get(`/api/user/campaign/${campaignId}/withdraw-requests`, {
        params: { cursor, limit: limit },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length === limit) {
          setCursor(res.data[res.data.length - 1].id);
          if (!hasMore) setHasMore(true);
        } else {
          setHasMore(false);
        }
        setWithdrawalRequests((prev) => [...prev, ...res.data]);
      })
      .catch((error: AxiosError) => {
        setWithdrawalRequests([]);
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

  return (
    <div className="px-4 max-h-[400px] overflow-y-auto">
      <ol className="relative border-s border-gray-200 max-w-5xl mx-auto">
        {withdrawalRequests.map((item, index) => (
          <CardFlowWithdraw key={item.id} data={item} index={index} />
        ))}
      </ol>
      {withdrawalRequests.length > 0 && !hasMore && (
        <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
          Tidak ada lagi data
        </div>
      )}
      {hasMore && (
        <div className="text-center">
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-2"
            disabled={loading}
            onClick={fetch}
          >
            {loading && <VscLoading className="animate-spin" />}
            Lebih banyak
          </Button>
        </div>
      )}
    </div>
  )
}

export default FlowWithdraw