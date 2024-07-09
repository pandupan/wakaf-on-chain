import React from 'react'
import CardCampaign from '@/components/shared/card-campaign'
import { Button } from '@/components/ui/button'
import { getAllCampaigns } from '@/data/campaign'
import { redirect } from 'next/navigation'

const LIMIT = 9;

async function Campaign() {
  const campaigns = await getAllCampaigns({ limit: LIMIT });

  if (campaigns === null) redirect('/error');

  return (
    <div className="space-y-2 bg-background p-4 rounded-xl shadow-sm">
      <h1 className="text-xl font-semibold">Kampanye</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <CardCampaign
            key={campaign.id}
            data={campaign}
            className="border shadow-none"
          />
        ))}
      </div>
      {campaigns.length === LIMIT && (
        <div className="text-center pt-2">
          <Button size="sm" variant="secondary" className="text-xs">
            Lebih banyak
          </Button>
        </div>
      )}
    </div>
  )
}

export default Campaign