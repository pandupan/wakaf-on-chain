'use client'

import InputSearch from "@/components/shared/input-search"
import CardHistoryWakaf from "./card-history-wakaf"
import { Campaign, Transaction } from "@prisma/client"
import { useCallback, useRef, useState } from "react";
import axios, { AxiosError, CancelTokenSource } from "axios";
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast";
import { toast } from "sonner";
import { VscLoading } from "react-icons/vsc";

interface IProps {
  data: (Transaction & {
    campaign?: Campaign;
  })[];
  limit: number;
}

function TransactionList({ data, limit }: IProps) {
  const [transactions, setTransactions] = useState(data);
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null);
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const { handleAxiosErrorToast } = useAxiosErrorToast()
  const observer = useRef<IntersectionObserver | null>()

  const handleSearch = (value: string) => {
    // Hapus spasi di awal dan di akhir
    value = value.trim();
    // Jika pencarian sebelumnya tidak sama dengan pencarian sekarang
    // Maka, lanjutkan pencarian
    if (search !== value) {
      setSearch(value);
      fetch(value, 'reset');
    }
  }

  const fetch = useCallback((keyword: string, type: 'reset' | 'pagination') => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    if (type === 'pagination') setLoading(true);
    else {
      setSearching(true);
      setHasMore(true);
    };

    axios
      .get(`/api/user/transaction`, {
        params: type === 'reset' ? { search: keyword, limit } : { cursor, limit: limit, search: keyword },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length === limit) {
          setCursor(res.data[res.data.length - 1].id);
          if (!hasMore) setHasMore(true);
        } else {
          setHasMore(false);
        }
        setTransactions((prev) => type === 'reset' ? [...res.data] : [...prev, ...res.data]);
      })
      .catch((error: AxiosError) => {
        setTransactions([]);
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
        if (type === 'pagination') setLoading(false);
        else setSearching(false);
      });
  }, [cursor]);

  const lastDataElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetch(search, 'pagination')
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore, search]);

  return (
    <>
      <div className="max-w-sm">
        <InputSearch
          placeholder="Cari transaksi: nama wakif, judul kampanye"
          onChange={handleSearch}
        />
      </div>
      {searching && (
        <div className="p-4 h-[200px] flex justify-center items-center">
          <VscLoading fontSize={20} className="animate-spin mx-auto" />
        </div>
      )}
      {!searching && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          {transactions.map((transaction, index) => {
            if (transactions.length === index + 1 && hasMore) return (
              <CardHistoryWakaf
                key={transaction.id}
                data={transaction}
                ref={lastDataElementRef}
              />
            )
            return (
              <CardHistoryWakaf
                key={transaction.id}
                data={transaction}
              />
            )
          })}
        </div>
      )}
      {!searching && loading && (
        <div className="p-4">
          <VscLoading fontSize={20} className="animate-spin mx-auto" />
        </div>
      )}
      {!searching && !hasMore && (
        <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
          Tidak ada lagi transaksi
        </div>
      )}
    </>
  )
}

export default TransactionList