'use client'

import React, { useCallback, useRef, useState } from 'react'
import InputSearch from '@/components/shared/input-search'
import CardCampaign from '@/components/shared/card-campaign'
import { Campaign } from '@prisma/client'
import axios, { AxiosError, CancelTokenSource } from 'axios'
import { toast } from 'sonner'
import { VscLoading } from 'react-icons/vsc'
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast'

interface IProps {
  data: Omit<Campaign, 'description'>[];
  limit: number;
}

function CampaignList({ data, limit }: IProps) {
  const [campaigns, setCampaigns] = useState<IProps['data']>(data)
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
      .get(`/api/user/campaign`, {
        params: type === 'reset' ? { search: keyword } : { cursor, limit: limit, search: keyword },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length === limit) {
          setCursor(res.data[res.data.length - 1].id);
          if (!hasMore) setHasMore(true);
        } else {
          setHasMore(false);
        }
        setCampaigns((prev) => type === 'reset' ? [...res.data] : [...prev, ...res.data]);
      })
      .catch((error: AxiosError) => {
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
      <div className="mt-4 max-w-sm">
        <InputSearch
          placeholder="Cari kampanye: judul, kategori"
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
          {campaigns.map((campaign, index) => {
            if (campaigns.length === index + 1 && hasMore) return (
              <CardCampaign
                key={campaign.id}
                data={campaign}
                ref={lastDataElementRef}
              />
            )
            return (
              <CardCampaign key={campaign.id} data={campaign} />
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
          Tidak ada lagi kampanye
        </div>
      )}
    </>
  )
}

export default CampaignList