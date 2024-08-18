import { cn } from '@/lib/utils';
import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

interface IProps {
  Icon: React.ComponentType;
  title: string;
  value: string;
  percentage?: number;
  percentageLabel?: string;
}

function CardOverview({ Icon, title, value, percentage, percentageLabel }: IProps) {
  return (
    <div className="relative w-full flex flex-row items-start gap-4 bg-background rounded-xl px-4 py-6 shadow-sm">
      {percentage && (
        <span className={cn(
          'absolute bottom-2 right-2 flex items-center text-[10px] sm:text-xs',
          percentage < 0 ? 'text-red-500' : 'text-emerald-500'
        )}>
          {percentage < 0 ? <FaArrowDown /> : <FaArrowUp />}
          {percentage.toFixed(2)}% {!!percentageLabel && percentageLabel}
        </span>
      )}
      <div className="w-10 sm:basis-14 h-10 sm:h-14 flex justify-center items-center bg-secondary/10 text-secondary p-3 rounded-full">
        {/* @ts-expect-error */}
        <Icon className="text-xl" />
      </div>
      <div>
        <h4 className="text-xs sm:text-sm text-muted-foreground">{title}</h4>
        <span className="text-lg xl:text-2xl font-bold tracking-wide">{value}</span>
      </div>
    </div>
  )
}

export default CardOverview