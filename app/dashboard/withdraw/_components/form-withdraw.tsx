'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import StepHeader from '../../berwakaf/_components/step-header'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import WithdrawStep1 from './withdraw-step-1'
import WithdrawStep2 from './withdraw-step-2'
import WithdrawStep3 from './withdraw-step-3'
import WithdrawStep4 from './withdraw-step-4'
import WithdrawStep5 from './withdraw-step-5'
import { CampaignItem, FormTypes, WithdrawalAccountItem } from '../_types'
import { WITHDRAW_MINIMAL } from '../../_constants/data'
import { VscLoading } from 'react-icons/vsc'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast'

interface IProps {
  campaigns: CampaignItem[];
  withdrawalAccounts: WithdrawalAccountItem[];
  initialValues: FormTypes;
}

function FormWithdraw({ campaigns, withdrawalAccounts, initialValues }: IProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialValues);
  const [steps, setStep] = useState({
    stepsCount: [1, 2, 3, 4, 5],
    currentStep: 1
  })

  const formWrapperRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const step5Ref = useRef<HTMLDivElement>(null);

  const navigate = useRouter();
  const { handleAxiosErrorToast } = useAxiosErrorToast();

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

  const updateFormWrapperHeight = () => {
    if (formWrapperRef.current) {
      const formWrapper = formWrapperRef.current;
      switch (steps.currentStep) {
        case 1:
          if (step1Ref.current) {
            const height = step1Ref.current.clientHeight;
            formWrapper.style.height = `${height + 4}px`;
          }
          break;
        case 2:
          if (step2Ref.current) {
            const height = step2Ref.current.clientHeight;
            formWrapper.style.height = `${height + 4}px`;
          }
          break;
        case 3:
          if (step3Ref.current) {
            const height = step3Ref.current.clientHeight;
            formWrapper.style.height = `${height + 4}px`;
          }
          break;
        case 4:
          if (step4Ref.current) {
            const height = step4Ref.current.clientHeight;
            formWrapper.style.height = `${height + 4}px`;
          }
          break;
        case 5:
          if (step5Ref.current) {
            const height = step5Ref.current.clientHeight;
            formWrapper.style.height = `${height + 4}px`;
          }
          break;
        default:
          break;
      }
    }
  };

  const disabledNextButton = useCallback(() => {
    switch (steps.currentStep) {
      case 1:
        return !form.campaignId;
      case 2:
        return form.amount < WITHDRAW_MINIMAL;
      case 3:
        return !form.withdrawAccountId;
      case 4:
        return form.description.length < 50;
      case 5:
      default:
        return false;
    }
  }, [steps.currentStep, form]);

  const handleSubmit = () => {
    setLoading(true);

    axios.post('/api/admin/withdraw', {
      ...form
    })
      .then((res) => {
        setTimeout(() => {
          navigate.push(`/dashboard/request-withdrawal/${res.data.id}`);
        }, 1000);
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        if (error.response) {
          handleAxiosErrorToast(error.response!.status);
        } else {
          toast.error('Internal Error');
        }
      });
  }

  useEffect(() => {
    updateFormWrapperHeight();

    const handleResize = () => {
      updateFormWrapperHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [steps.currentStep])

  return (
    <div className="bg-background p-4 rounded-xl shadow-sm space-y-2">
      <h2 className="text-lg font-bold text-secondary">Cairkan Wakaf</h2>
      <StepHeader data={steps} />
      <div className="w-full overflow-x-hidden">
        <div
          ref={formWrapperRef}
          className="flex items-start gap-1 px-0.5 transition-all duration-500 overflow-y-hidden"
          style={{
            width: 100 * 5 + '%',
            transform: `translateX(-${100 / 5 * (steps.currentStep - 1)}%)`
          }}
        >
          <WithdrawStep1
            ref={step1Ref}
            campaigns={campaigns}
            onSelectCampaign={(campaignId) => {
              setForm((prev) => ({ ...prev, campaignId }));
            }}
          />
          <WithdrawStep2
            ref={step2Ref}
            campaign={campaigns.find((item) => item.id === form.campaignId)}
            onValueChange={(amount) => {
              setForm((prev) => ({ ...prev, amount }))
            }}
          />
          <WithdrawStep3
            ref={step3Ref}
            withdrawalAccounts={withdrawalAccounts}
            onSelectAccount={(withdrawAccountId) => {
              setForm((prev) => ({ ...prev, withdrawAccountId }))
            }}
          />
          <WithdrawStep4
            ref={step4Ref}
            onDescriptionChange={(description) => {
              setForm((prev) => ({ ...prev, description }))
            }}
          />
          <WithdrawStep5
            ref={step5Ref}
            amount={form.amount}
            description={form.description}
            campaign={campaigns.find((item) => item.id === form.campaignId)}
            withdrawAccount={withdrawalAccounts.find((item) => item.id === form.withdrawAccountId)}
            onChangeStep={(step) => setStep((prev) => ({ ...prev, currentStep: step }))}
          />
        </div>
      </div>
      <div className="space-y-4">
        <Separator />
        <div className="flex gap-4">
          {steps.currentStep > 1 && (
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="w-full flex-1"
              disabled={loading}
            >
              Kembali
            </Button>
          )}
          {steps.currentStep < steps.stepsCount.length ? (
            <Button
              onClick={handleNextStep}
              variant="secondary"
              className="w-full flex-1"
              disabled={disabledNextButton()}
            >
              Lanjutkan
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="w-full flex-1 gap-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && <VscLoading className="animate-spin" />}
              Konfirmasi
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormWithdraw