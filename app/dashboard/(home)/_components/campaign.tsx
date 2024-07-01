import React from 'react'
import CardCampaign from '@/components/shared/card-campaign'
import { Button } from '@/components/ui/button'

function Campaign() {
  return (
    <div className="space-y-2 bg-background p-4 rounded-xl shadow-sm">
      <h1 className="text-xl font-semibold">Kampanye</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <CardCampaign className="border shadow-none" />
        <CardCampaign className="border shadow-none" />
        <CardCampaign className="border shadow-none" />
        <CardCampaign className="border shadow-none" />
        <CardCampaign className="border shadow-none" />
        <CardCampaign className="border shadow-none" />
      </div>
      <div className="text-center pt-2">
        <Button size="sm" variant="secondary" className="text-xs">
          Lebih banyak
        </Button>
      </div>
    </div>
  )
}

export default Campaign