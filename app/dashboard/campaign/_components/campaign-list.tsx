import React from 'react'
import InputSearch from '@/components/core/input-search'
import CardCampaign from '@/components/shared/card-campaign'
import { Campaign } from '@prisma/client'

interface IProps {
  data: Omit<Campaign, 'description'>[];
}

function CampaignList({ data }: IProps) {
  return (
    <>
      <div className="mt-4 max-w-sm">
        <InputSearch placeholder="Cari kampanye" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {data.map((campaign) => (
          <CardCampaign key={campaign.id} data={campaign} />
        ))}
      </div>
    </>
  )
}

export default CampaignList