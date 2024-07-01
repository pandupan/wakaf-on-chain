import React from 'react'
import { Progress } from '../ui/progress'
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
}

function CardCampaign({ className }: IProps) {
  return (
    <div className={cn(
      'bg-background rounded-md shadow-sm grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 p-4',
      className
    )}>
      <div className="w-full aspect-video rounded-md overflow-hidden">
        <img
          src="https://picsum.photos/id/83/1600/900"
          className="w-full h-full"
          alt="campaign 1"
        />
      </div>
      <div className="sm:space-y-2">
        <h2 className="text-sm sm:text-base font-semibold leading-tight">
          Wakaf untuk kebutuhan mesjid
        </h2>
        <span className="text-xs sm:text-sm text-secondary font-semibold tracking-wide">
          Rp12.000.000
        </span>
        <div className="flex justify-between items-end text-gray-700">
          <div>
            <h4 className="text-xs leading-3">Donator</h4>
            <span className="block font-semibold text-xs sm:text-sm">89</span>
          </div>
          <div>
            <h4 className="text-xs leading-3">Sisa hari</h4>
            <span className="block font-semibold text-xs sm:text-sm text-right">1</span>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex justify-between">
          <div>
            <h4 className="text-xs leading-3">Terkumpul</h4>
            <span className="block font-semibold text-xs sm:text-sm text-secondary">Rp9.835.000</span>
          </div>
          <div className="text-right">
            <h4 className="text-xs leading-3">Sisa</h4>
            <span className="block font-semibold text-xs sm:text-sm text-secondary">Rp805.000</span>
          </div>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs">Total: Rp12.000.000</span>
          <Progress value={33} className="h-1.5 sm:h-2" />
        </div>
      </div>
    </div>
  )
}

export default CardCampaign