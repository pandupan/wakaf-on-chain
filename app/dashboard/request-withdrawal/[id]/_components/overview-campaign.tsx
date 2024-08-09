import { Button } from '@/components/ui/button'
import { formatRupiah } from '@/lib/utils';
import { Campaign } from '@prisma/client';
import Link from 'next/link';
import React from 'react'

interface IProps {
  data: Pick<Campaign,
    'id' | 'title' | 'category' | 'availableBalance' | 'collected' | 'image'
  >
}

function OverviewCampaign({ data }: IProps) {
  return (
    <div className="p-4 border rounded-md space-y-2">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-full sm:w-[250px] aspect-[4/3] rounded bg-muted overflow-hidden">
          <img
            src={data.image}
            alt="campaign image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full">
          <span className="block text-xs sm:text-sm text-secondary capitalize">
            {data.category}
          </span>
          <h3 className="text-sm sm:text-base font-semibold leading-5">
            {data.title}
          </h3>
          <div className="flex items-end justify-between gap-2 -mt-1">
            <div>
              <span className="text-xs">Terkumpul</span>
              <h5 className="text-sm text-secondary font-semibold tracking-wide -mt-1">
                {formatRupiah(data.collected)}
              </h5>
            </div>
            <div className="text-right">
              <span className="text-xs">Tersedia</span>
              <h5 className="text-sm text-secondary font-semibold tracking-wide -mt-1">
                {formatRupiah(data.availableBalance)}
              </h5>
            </div>
          </div>
          <Link href={`/dashboard/campaign/${data.id}`}>
            <Button size="sm" variant="secondary" className="text-xs h-auto py-1.5 rounded mt-2">
              Detail
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OverviewCampaign
