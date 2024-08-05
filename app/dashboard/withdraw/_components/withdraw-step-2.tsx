import { Input } from '@/components/ui/input'
import { addThousandSeparatorNumber, formatRupiah } from '@/lib/utils';
import React, { forwardRef } from 'react'
import { CampaignItem } from '../_types';

interface IProps {
  onValueChange: (amount: number) => void;
  campaign?: CampaignItem;
}

const WithdrawStep2 = forwardRef<HTMLDivElement, IProps>(({
  onValueChange,
  campaign
}, ref) => {
  return (
    <div className="w-full space-y-4" ref={ref}>
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">2</span>
        <h1 className="text-lg font-bold">Masukan nominal</h1>
      </div>
      <div className="space-y-2">
        <div className="border p-4 rounded-lg space-y-2">
          {campaign && (
            <div>
              <h2 className="text-sm">Saldo tersedia</h2>
              <span className="block font-bold text-secondary text-lg">
                {formatRupiah(campaign.availableBalance)}
              </span>
            </div>
          )}
          <label className="relative block bg-gray-100 rounded-md">
            <span className="absolute left-4 top-[50%] -translate-y-[50%] font-extrabold text-lg sm:text-xl">
              Rp
            </span>
            <Input
              className="pl-14 pr-4 py-3 h-auto text-right font-extrabold text-xl sm:text-2xl bg-transparent border-0 focus-visible:ring-transparent focus-visible:ring-0"
              placeholder="0"
              onChange={(e) => {
                const value = +e.target.value.replace(/[^0-9]/g, '');
                e.target.value = addThousandSeparatorNumber(value);
                onValueChange(value);
              }}
            />
          </label>
          <span className="block text-xs font-semibold text-gray-400">
            Minimal pencairan sebesar Rp100.000<sup>*</sup>
          </span>
        </div>
      </div>
    </div>
  )
})

WithdrawStep2.displayName = "WithdrawStep2"

export default WithdrawStep2