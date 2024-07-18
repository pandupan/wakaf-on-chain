'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import StepHeader from './step-header'
import Step1 from './step-1'
import { Separator } from '@/components/ui/separator'
import Step2 from './step-2'
import Step3 from './step-3'
import Step4 from './step-4'
import { Campaign } from '@prisma/client'
import { MIN_AMOUNT } from '../../_constants/data'
import { FormTypes } from '../_types'
import { Session } from 'next-auth'
import { VscLoading } from 'react-icons/vsc'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast'
import { useRouter } from 'next/navigation'

interface IProps {
  data: Omit<Campaign, 'description'> | null;
  initialForm: FormTypes;
  user: Session['user'];
  campaignId: number;
}

function FormBerwakaf({ data, initialForm, user, campaignId }: IProps) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [steps, setStep] = useState({
    stepsCount: [1, 2, 3, 4],
    currentStep: 1
  })

  const { handleAxiosErrorToast } = useAxiosErrorToast();
  const navigate = useRouter();

  const formWrapperRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

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

  const handleSubmit = () => {
    setLoading(true);

    axios.post('/api/transaction', {
      ...form.step1,
      ...form.step2,
      ...form.step3,
      name: form.step3.isHiddenName ? '' : form.step3.name,
      userId: user.id,
      campaignId
    })
      .then((res) => {
        navigate.push(`/dashboard/transaction/${res.data.id}`);
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

  const disabledNextButton = useCallback(() => {
    switch (steps.currentStep) {
      case 1:
        const { amount } = form.step1;
        return amount < MIN_AMOUNT;
      case 2:
        const { paymentMethodId, paymentMethodLabel } = form.step2;
        return !paymentMethodId || !paymentMethodLabel;
      case 3:
        const { email, name } = form.step3;
        return !email || !name;
      case 4:
      default:
        return false;
    }
  }, [steps.currentStep, form]);

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
        default:
          break;
      }
    }
  };

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
    <div className="w-full bg-background p-4 sm:p-6 rounded-xl shadow-sm space-y-2">
      <h2 className="text-lg font-bold text-secondary">Mari Berwakaf</h2>
      <StepHeader data={steps} />
      <div className="w-full overflow-x-hidden">
        <div
          ref={formWrapperRef}
          className="flex items-start gap-1 px-0.5 transition-all duration-500 overflow-y-hidden"
          style={{
            width: 100 * 4 + '%',
            transform: `translateX(-${100 / 4 * (steps.currentStep - 1)}%)`
          }}
        >
          <Step1
            ref={step1Ref}
            onChange={(amount) => {
              setForm((prev) => ({
                ...prev,
                step1: {
                  ...prev.step1,
                  amount
                }
              }))
            }}
          />
          <Step2
            ref={step2Ref}
            onChange={(payment) => {
              setForm((prev) => ({
                ...prev,
                step2: {
                  ...prev.step2,
                  paymentMethodId: payment.value,
                  paymentMethodLabel: payment.label
                }
              }))
            }}
          />
          <Step3
            ref={step3Ref}
            data={form.step3}
            onChange={(key, value) => {
              setForm((prev) => ({
                ...prev,
                step3: {
                  ...prev.step3,
                  [key]: value
                }
              }))
            }}
          />
          <Step4
            ref={step4Ref}
            data={form}
            user={user}
            onChangeStep={() => {
              setStep((prev) => ({
                ...prev,
                currentStep: 2
              }))
            }}
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
              disabled={!data || data.status !== 'RUNNING' || loading}
            >
              Kembali
            </Button>
          )}
          {steps.currentStep < steps.stepsCount.length ? (
            <Button
              onClick={handleNextStep}
              variant="secondary"
              className="w-full flex-1"
              disabled={!data || data.status !== 'RUNNING' || disabledNextButton() || loading}
            >
              Lanjutkan
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="w-full flex-1 gap-2"
              disabled={!data || data.status !== 'RUNNING' || loading}
              onClick={handleSubmit}
            >
              {loading && <VscLoading className="animate-spin" />}
              Serah Terima
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormBerwakaf