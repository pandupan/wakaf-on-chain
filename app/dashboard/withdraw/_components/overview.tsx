import React from 'react'
import CardOverview from './card-overview'
import { formatRupiah } from '@/lib/utils';

interface IProps {
  data: {
    totalAvailableBalance: number;
    campaignsEligible: number;
  }
};

function Overview({ data }: IProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CardOverview
        className="bg-gradient-to-tr from-secondary to-lime-400 text-secondary-foreground"
        title="Wakaf Tersedia"
        value={formatRupiah(data.totalAvailableBalance)}
      />
      <CardOverview
        className="bg-gradient-to-r from-violet-400 to-sky-400 text-secondary-foreground"
        title="Yang Bisa Dicairkan"
        value={`${data.campaignsEligible} Kampanye`}
      />
    </div>
  )
}

export default Overview