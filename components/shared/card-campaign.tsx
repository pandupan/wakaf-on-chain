import React from 'react'
import { Progress } from '../ui/progress'
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface IProps {
  className?: string;
}

function CardCampaign({ className }: IProps) {
  return (
    <Link href="/dashboard/campaign/1">
      <div className={cn(
        'bg-background rounded-md shadow-sm grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 p-4',
        className
      )}>
        <div className="w-full aspect-[4/3] rounded-md overflow-hidden">
          <img
            src="https://picsum.photos/id/83/1600/900"
            className="w-full h-full"
            alt="campaign 1"
          />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-bold">
            Kebutuhan untuk perbaikan mesjid al ihsan tasikmalaya 2024
          </h2>
          <h5 className="text-xs sm:text-sm text-secondary font-semibold tracking-wide -mt-1">
            Rp12.000.000
          </h5>
          <div className="flex justify-between items-end text-gray-700">
            <div>
              <h4 className="text-xs leading-3">Donator</h4>
              <span className="block font-semibold text-xs sm:text-sm">89</span>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex justify-between">
            <div>
              <h4 className="text-xs leading-3">Terkumpul</h4>
              <span className="block font-semibold text-xs sm:text-sm text-green-500">Rp9.835.000</span>
            </div>
            <div className="text-right">
              <h4 className="text-xs leading-3">Sisa</h4>
              <span className="block font-semibold text-xs sm:text-sm text-red-500">Rp805.000</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] sm:text-xs">Total: Rp12.000.000</span>
            <Progress value={33} className="h-1.5 sm:h-2" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardCampaign