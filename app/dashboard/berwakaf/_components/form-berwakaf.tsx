'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import StepHeader from './step-header'
import Step1 from './step-1'
import { Separator } from '@/components/ui/separator'
import Step2 from './step-2'
import Step3 from './step-3'
import Step4 from './step-4'
import { Campaign } from '@prisma/client'

interface IProps {
  data: Omit<Campaign, 'description'> | null;
}

function FormBerwakaf({ data }: IProps) {
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
    <div className="w-full bg-background p-4 sm:p-6 rounded-xl shadow-sm space-y-2">
      <h2 className="text-lg font-bold text-secondary">Mari Berwakaf</h2>
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
      <div className="space-y-4">
        <Separator />
        <div className="flex gap-4">
          {steps.currentStep > 1 && (
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="w-full flex-1"
              disabled={!data || data.status !== 'RUNNING'}
            >
              Kembali
            </Button>
          )}
          {steps.currentStep < steps.stepsCount.length ? (
            <Button
              onClick={handleNextStep}
              variant="secondary"
              className="w-full flex-1"
              disabled={!data || data.status !== 'RUNNING'}
            >
              Lanjutkan
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="w-full flex-1"
              disabled={!data || data.status !== 'RUNNING'}
            >
              Serah Terima
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormBerwakaf