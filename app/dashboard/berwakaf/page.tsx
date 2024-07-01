'use client'

import React, { useState } from 'react'
import OverviewCampaign from './_components/overview-campaign'
import { Button } from '@/components/ui/button'
import StepHeader from './_components/step-header'
import Step1 from './_components/step-1'
import HowToWakaf from './_components/how-to-wakaf'
import { Separator } from '@/components/ui/separator'
import Step2 from './_components/step-2'
import Step3 from './_components/step-3'
import Step4 from './_components/step-4'

function BerwakafPage() {
  const [steps, setStep] = useState({
    stepsCount: [1, 2, 3, 4],
    currentStep: 1
  })

  const handleNextStep = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }))
  }

  const handlePrevStep = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1
    }))
  }

  return (
    <div className="w-full grid items-start grid-cols-12 gap-4">
      <OverviewCampaign />
      <div className="col-span-12 md:col-span-7">
        <div className="w-full bg-background p-4 sm:p-6 rounded-xl shadow-sm space-y-8">
          <StepHeader data={steps} />
          {steps.currentStep === 1 && (
            <Step1 />
          )}
          {steps.currentStep === 2 && (
            <Step2 />
          )}
          {steps.currentStep === 3 && (
            <Step3 />
          )}
          {steps.currentStep === 4 && (
            <Step4 />
          )}
          <div className="space-y-4 sm:space-y-6">
            <Separator />
            <div className="flex gap-4">
              {steps.currentStep > 1 && (
                <Button onClick={handlePrevStep} variant="outline" className="w-full flex-1">
                  Kembali
                </Button>
              )}
              {steps.currentStep < steps.stepsCount.length ? (
                <Button onClick={handleNextStep} variant="secondary" className="w-full flex-1">
                  Lanjutkan
                </Button>
              ) : (
                <Button variant="secondary" className="w-full flex-1">
                  Serah Terima
                </Button>
              )}
            </div>
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