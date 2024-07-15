import { Button } from '@/components/ui/button'
import React from 'react'

function OverviewCampaign() {
  return (
    <div className="p-4 border rounded-md space-y-2">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-full sm:w-[250px] aspect-[4/3] rounded bg-muted"></div>
        <div className="w-full">
          <span className="block text-xs sm:text-sm text-secondary">Lingkungan</span>
          <h3 className="text-sm sm:text-base font-semibold leading-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </h3>
          <Button size="sm" variant="secondary" className="text-xs mt-2">
            Detail
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OverviewCampaign