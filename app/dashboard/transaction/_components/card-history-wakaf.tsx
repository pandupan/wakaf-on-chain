import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { formatIndonesianDate, formatRupiah } from '@/lib/utils';
import { Campaign, Transaction } from '@prisma/client'
import Link from 'next/link';
import { forwardRef } from 'react';

interface IProps {
  data: Transaction & {
    campaign?: Campaign;
  }
}

const CardHistoryWakaf = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="relative bg-background rounded-md shadow-sm grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 p-4">
      <div className="col-span-2">
        <span className="block text-[10px] leading-3 text-gray-400">
          {formatIndonesianDate(new Date(data.createdAt))}
        </span>
        <div className="absolute right-4 top-1">
          <Badge
            variant={
              data.status === 'PENDING' ? 'info' : data.status === 'FAILED' ? 'destructive' : 'success'
            }
            className="text-[10px]"
          >
            {data.status === 'PENDING' ? 'Pending' : data.status === 'FAILED' ? 'Dibatalkan' : 'Berhasil'}
          </Badge>
        </div>
        <h3 className="text-sm">
          ID Transaksi: <b>{data.id}</b>
        </h3>
      </div>
      <div className="w-full aspect-[4/3] rounded-md overflow-hidden">
        <img
          src={data.campaign!.image}
          className="w-full h-full"
          alt="banner campaign"
        />
      </div>
      <div className="sm:space-y-1">
        <h2 className="text-sm font-bold line-clamp-2">
          {data.campaign!.title}
        </h2>
        <div>
          <h5 className="text-xs text-gray-700 font-semibold">
            Berwakaf sebesar
          </h5>
          <span className="block text-xs md:text-sm text-secondary font-bold">
            {formatRupiah(data.amount)}
          </span>
        </div>
        <div className="flex justify-between items-end text-gray-700 pt-1">
          <div>
            <h4 className="text-xs leading-3">Wakif ke</h4>
            <span className="block font-semibold text-xs md:text-sm">
              {data.numberOfWakif || '-'}
            </span>
          </div>
          <div className="text-right">
            <h4 className="text-xs leading-3">Metode</h4>
            <span className="block font-semibold text-xs md:text-sm">
              {data.paymentMethodLabel}
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-2 pt-2">
        <div className="w-full flex items-center gap-2 sm:gap-4">
          <Link
            href={`/dashboard/campaign/${data.campaign!.id}`}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full"
          >
            <Button size="sm" variant="outline" className="w-full text-xs flex-1">
              Detail Kampanye
            </Button>
          </Link>
          <Link
            href={`/dashboard/transaction/${data.id}`}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full"
          >
            <Button size="sm" variant="secondary" className="w-full text-xs flex-1">
              Detail Transaksi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
})

CardHistoryWakaf.displayName = "CardHistoryWakaf"

export default CardHistoryWakaf