import React from 'react'
import CardOverview from '../../../../components/shared/overview-card'
import { BsCurrencyDollar } from "react-icons/bs"
import { FaHandHoldingUsd } from 'react-icons/fa'
import { HiOutlineTrophy } from "react-icons/hi2"
import { getUserOverview } from '@/data/overview'
import { formatRupiah } from '@/lib/utils'
import { PiChartLineUp } from 'react-icons/pi'

interface IProps {
  userId: string;
}

async function UserOverview({ userId }: IProps) {
  const data = await getUserOverview(userId);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardOverview
        Icon={BsCurrencyDollar}
        title="Total Wakaf"
        value={formatRupiah(data.wakaf)}
      />
      <CardOverview
        Icon={PiChartLineUp}
        title="Wakaf Terbesar"
        value={formatRupiah(data.largestWakaf)}
      />
      <CardOverview
        Icon={FaHandHoldingUsd}
        title="Jumlah Berwakaf"
        value={`${data.berwakaf}x`}
      />
      <CardOverview
        Icon={HiOutlineTrophy}
        title="Peringkat"
        value={data.ranking}
      />
    </div>
  )
}

export default UserOverview