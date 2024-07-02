import React from 'react'

interface IProps {
  Icon: React.ComponentType;
  title: string;
  value: string;
}

function CardOverview({ Icon, title, value }: IProps) {
  return (
    <div className="w-full flex flex-row items-start gap-4 bg-background rounded-xl px-4 py-6 shadow-sm">
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