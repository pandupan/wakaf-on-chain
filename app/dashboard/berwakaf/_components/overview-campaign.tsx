import CardCampaign from '@/components/shared/card-campaign'
import React from 'react'
import HowToWakaf from './how-to-wakaf'

function OverviewCampaign() {
  return (
    <div className="bg-background p-4 sm:p-6 lg:p-4 xl:p-6 rounded-xl shadow-sm space-y-6">
      <div className="space-y-1">
        <h1 className="font-extrabold tracking-wide">Kampanye terpilih:</h1>
        <CardCampaign className="border shadow-none" />
      </div>
      <HowToWakaf className="hidden md:block" />
    </div>
  )
}

export default OverviewCampaign