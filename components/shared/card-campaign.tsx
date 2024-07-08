import React from 'react'
import { Progress } from '../ui/progress'
import { cn, formatRupiah } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Campaign } from '@prisma/client';

interface IProps {
  className?: string;
  data: Omit<Campaign, 'description'>;
  onlyView?: boolean;
}

function CardCampaign({ className, data, onlyView }: IProps) {
  const content = (
    <div className={cn(
      'bg-background rounded-md shadow-sm grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 p-4',
      className
    )}>
      <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
        <img
          src={data.image}
          className="w-full h-full"
          alt="campaign banner"
        />
        <div className="absolute left-1 top-0">
          <Badge
            variant={
              data.status === 'RUNNING' ? 'info' : data.status === 'CLOSED' ? 'destructive' : 'success'
            }
            className="text-[10px]"
          >
            {data.status === 'RUNNING' ? 'Berjalan' : data.status === 'CLOSED' ? 'Ditutup' : 'Selesai'}
          </Badge>
        </div>
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold">
          {data.title}
        </h2>
        <h5 className="text-xs sm:text-sm text-secondary font-semibold tracking-wide -mt-1">
          {formatRupiah(data.target)}
        </h5>
        <div className="flex justify-between items-end text-gray-700">
          <div>
            <h4 className="text-xs leading-3">Kategori</h4>
            <span className="block text-xs sm:text-sm text-secondary capitalize">
              {data.category}
            </span>
          </div>
          <div className="text-right">
            <h4 className="text-xs leading-3">Wakif</h4>
            <span className="block font-semibold text-xs sm:text-sm">
              {data.numberOfWakif}
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex justify-between">
          <div>
            <h4 className="text-xs leading-3">Terkumpul</h4>
            <span className="block font-semibold text-xs sm:text-sm text-green-500">
              {formatRupiah(data.collected)}
            </span>
          </div>
          <div className="text-right">
            <h4 className="text-xs leading-3">Sisa</h4>
            <span className="block font-semibold text-xs sm:text-sm text-red-500">
              {formatRupiah(data.remaining)}
            </span>
          </div>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs">Total: {formatRupiah(data.target)}</span>
          <Progress value={(data.collected / (data.remaining)) * 100} className="h-1.5 sm:h-2" />
        </div>
      </div>
    </div>
  )

  if (onlyView) return content;

  return (
    <Link href={`/dashboard/campaign/${data.id}`}>
      {content}
    </Link>
  )
}

export default CardCampaign