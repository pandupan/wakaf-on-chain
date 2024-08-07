import { Button } from '@/components/ui/button'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { Separator } from '@/components/ui/separator'
import { forwardRef, useState } from 'react'
import { formatRupiah } from '@/lib/utils'
import { CampaignItem, WithdrawalAccountItem } from '../_types'

interface IProps {
  campaign?: CampaignItem;
  withdrawAccount?: WithdrawalAccountItem;
  description: string;
  amount: number;
  onChangeStep: (step: number) => void;
}

const WithdrawStep5 = forwardRef<HTMLDivElement, IProps>(({
  amount,
  campaign,
  description,
  withdrawAccount,
  onChangeStep
}, ref) => {
  return (
    <div className="w-full space-y-4" ref={ref}>
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">5</span>
        <h1 className="text-lg font-bold">Rincian Informasi</h1>
      </div>
      {campaign && (
        <div className="p-4 border rounded-lg">
          <div>
            <h2 className="text-sm font-bold">
              {campaign.title}
            </h2>
            <h4 className="text-sm font-semibold">{formatRupiah(200000)}</h4>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <span className="text-xs">Terkumpul</span>
              <h5 className="text-sm text-secondary font-semibold tracking-wide -mt-1">
                {formatRupiah(campaign.collected)}
              </h5>
            </div>
            <div className="text-right">
              <span className="text-xs">Tersedia</span>
              <h5 className="text-sm text-secondary font-semibold tracking-wide -mt-1">
                {formatRupiah(campaign.availableBalance)}
              </h5>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-xs w-full rounded-full h-auto py-1.5 mt-2"
            onClick={(() => onChangeStep(1))}
          >
            Ubah
          </Button>
        </div>
      )}
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Pencair</span>
          <span>Aam Hermansyah</span>
        </div>
        <div className="">
          <span className="font-semibold text-gray-400">Alasan Pencairan</span>
          <p className="text-justify">
            {description}
          </p>
        </div>
      </div>
      {withdrawAccount && (
        <>
          <Separator />
          <div className="space-y-2 text-sm sm:text-base">
            <h1 className="font-bold">Detail Pencairan</h1>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-gray-400">Metode Transaksi</span>
              <span>{withdrawAccount.bankName}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-gray-400">No. Rek/Tujuan</span>
              <span>{withdrawAccount.accountNumber}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-gray-400">Atas Nama</span>
              <span>{withdrawAccount.accountHolder}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-gray-400">Nominal</span>
              <span className="font-bold">
                {formatRupiah(amount)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
})

WithdrawStep5.displayName = "WithdrawStep5"

export default WithdrawStep5