import { cn } from '@/lib/utils'
import React from 'react'

interface IProps {
  className?: string;
  title: string;
  value: string;
}

function CardOverview({ className, title, value }: IProps) {
  return (
    <div className={cn(
      'p-6 rounded-xl',
      className
    )}>
      <h4 className="text-xs sm:text-sm">{title}</h4>
      <h3 className="text-xl sm:text-2xl font-bold">{value}</h3>
    </div>
  )
}

export default CardOverview