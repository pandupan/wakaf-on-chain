import React from 'react'
import OverviewCampaign from './_components/overview-campaign'
import { Button } from '@/components/ui/button'
import StepHeader from './_components/step-header'
import Step1 from './_components/step-1'
import HowToWakaf from './_components/how-to-wakaf'
import { Separator } from '@/components/ui/separator'

function BerwakafPage() {
  return (
    <div className="w-full grid items-start grid-cols-12 gap-4">
      <OverviewCampaign />
      <div className="col-span-12 md:col-span-7">
        <div className="w-full bg-background p-4 sm:p-6 rounded-xl shadow-sm space-y-8">
          <StepHeader />
          <Step1 />
          <div className="space-y-4 sm:space-y-6">
            <Separator />
            <Button variant="secondary" className="w-full">
              Lanjutkan Pembayaran
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 rounded-lg bg-background col-span-12 md:hidden">
        <HowToWakaf />
      </div>
    </div>
  )
}

export default BerwakafPage