import React, { forwardRef } from 'react'
import { formatRupiah } from '@/lib/utils';
import { CampaignItem } from '../_types';

interface IProps {
  campaigns: CampaignItem[];
  onSelectCampaign: (id: number) => void;
}

const WithdrawStep1 = forwardRef<HTMLDivElement, IProps>(({
  campaigns,
  onSelectCampaign
}, ref) => {
  return (
    <div className="w-full space-y-4" ref={ref}>
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">1</span>
        <h1 className="text-lg font-bold">Pilih kampanye</h1>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {campaigns.map((item) => (
          <div key={`cl-${item.id}`}>
            <input
              type="radio"
              id={`campaign-${item.id}`}
              name="campaign"
              value={`${item.id}`}
              className="hidden peer"
              onChange={(e) => onSelectCampaign(+e.target.value)}
            />
            <label
              htmlFor={`campaign-${item.id}`}
              className="block p-4 border peer-checked:border-secondary rounded-lg cursor-pointer peer-checked:bg-secondary/10 transition"
            >
              <div>
                <h2 className="text-sm font-bold">
                  {item.title}
                </h2>
                <h4 className="text-sm font-semibold">{formatRupiah(item.target)}</h4>
              </div>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <span className="text-xs">Terkumpul</span>
                  <h5 className="text-sm text-secondary font-semibold tracking-wide -mt-1">
                    {formatRupiah(item.collected)}
                  </h5>
                </div>
                <div className="text-right">
                  <span className="text-xs">Tersedia</span>
                  <h5 className="text-sm text-secondary font-semibold tracking-wide -mt-1">
                    {formatRupiah(item.availableBalance)}
                  </h5>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
})

WithdrawStep1.displayName = "WithdrawStep1"

export default WithdrawStep1