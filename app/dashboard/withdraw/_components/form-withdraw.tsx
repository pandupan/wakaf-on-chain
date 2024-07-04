'use client'

import React, { useState } from 'react'
import StepHeader from '../../berwakaf/_components/step-header'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import WithdrawStep1 from './withdraw-step-1'
import WithdrawStep2 from './withdraw-step-2'
import WithdrawStep3 from './withdraw-step-3'
import WithdrawStep4 from './withdraw-step-4'
import WithdrawStep5 from './withdraw-step-5'

function FormWithdraw() {
  const [steps, setStep] = useState({
    stepsCount: [1, 2, 3, 4, 5],
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
    <div className="bg-background p-4 rounded-xl shadow-sm space-y-2">
      <h2 className="text-lg font-bold text-secondary">Cairkan Wakaf</h2>
      <StepHeader data={steps} />
      {steps.currentStep === 1 && (
        <WithdrawStep1 />
      )}
      {steps.currentStep === 2 && (
        <WithdrawStep2 />
      )}
      {steps.currentStep === 3 && (
        <WithdrawStep3 />
      )}
      {steps.currentStep === 4 && (
        <WithdrawStep4 />
      )}
      {steps.currentStep === 5 && (
        <WithdrawStep5 />
      )}
      <div className="space-y-4">
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
              Konfirmasi
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormWithdraw