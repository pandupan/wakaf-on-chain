'use client'

import { Button } from '@/components/ui/button'
import { FaWhatsapp } from 'react-icons/fa6'
import Link from 'next/link'
import useCopyText from '@/hooks/useCopyText';
import { cn } from '@/lib/utils';

interface IProps {
  phone: string;
  className?: string;
}

function ContactCampaign({ phone, className }: IProps) {
  const { copyToClipboard } = useCopyText();

  return (
    <div className={cn(
      'px-4 py-10 bg-background rounded-lg space-y-4',
      className
    )}>
      <h6 className="text-sm sm:text-base font-semibold text-center">
        Ada pertanyaan atau masalah terkait ini? {" "}
        <br className="hidden sm:block" />
        Hubungi:
      </h6>
      <div className="
        w-full 
        flex 
        flex-col 
        sm:flex-row 
        md:flex-col 
        xl:flex-row 
        gap-x-4 
        gap-y-2 
        justify-center 
        items-center
      ">
        <Button
          size="sm"
          variant="outline"
          className="text-xs font-bold rounded-full"
          onClick={() => {
            copyToClipboard(phone.replace(/^08/gi, '628'), {
              customSuccessMessage: 'Nomor telepon berhasil disalin.'
            })
          }}
        >
          +62-8231-6126-449
        </Button>
        <span className="text-xs">
          Atau
        </span>
        <Link
          href={`https://wa.me/+${phone.replace(/^08/gi, '628')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" variant="success" className="text-xs gap-2 font-bold rounded-full">
            Hubungi dengan <FaWhatsapp fontSize={20} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ContactCampaign