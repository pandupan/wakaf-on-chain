'use client'

import React, { useCallback, useRef, useState } from 'react'
import InputSearch from '@/components/shared/input-search'
import CardCampaign from '@/components/shared/card-campaign'
import { Campaign } from '@prisma/client'
import axios, { AxiosError } from 'axios'
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

  const { handleAxiosErrorToast } = useAxiosErrorToast()
  const observer = useRef<IntersectionObserver | null>()

  const lastDataElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setLoading(true);
        axios.get(`/api/user/campaign?cursor=${cursor}&limit=${limit}`)
          .then((res) => {
            if (res.data.length === limit) {
              setCursor(data[data.length - 1].id);
            } else {
              setHasMore(false);
            }
            setCampaigns((prev) => [...prev, ...res.data]);
          })
          .catch((error: AxiosError) => {
            if (error.response) {
              handleAxiosErrorToast(error.response!.status);
            } else {
              toast.error('Internal Error');
            }
          })
          .finally(() => setLoading(false));
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <>
      <div className="mt-4 max-w-sm">
        <InputSearch placeholder="Cari kampanye" />
      </div>
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
      {loading && (
        <div className="p-4">
          <VscLoading fontSize={20} className="animate-spin mx-auto" />
        </div>
      )}
      {!hasMore && (
        <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
          Tidak ada lagi kampanye
        </div>
      )}
    </>
  )
}

export default CampaignList