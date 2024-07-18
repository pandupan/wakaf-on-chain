import React from 'react'
import { BsCashCoin, BsCurrencyDollar } from "react-icons/bs"
import { FaHandHoldingUsd } from 'react-icons/fa'
import { HiOutlineTrophy } from "react-icons/hi2"
import { MdCampaign } from "react-icons/md"
import CardOverview from '../../../../components/shared/overview-card'
import { LuUser2 } from 'react-icons/lu'
import { numberPrefixer } from '@/lib/utils'

function AdminOverview() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardOverview
        Icon={LuUser2}
        title="Total Pengguna"
        value={numberPrefixer(2000)}
      />
      <CardOverview
        Icon={FaHandHoldingUsd}
        title="Total Berwakaf"
        value="170x"
      />
      <CardOverview
        Icon={BsCashCoin}
        title="Total Pemasukan"
        value="Rp1.200.000"
      />
      <CardOverview
        Icon={BsCurrencyDollar}
        title="Wakaf Tersisa"
        value="Rp200.000"
      />
      <CardOverview
        Icon={MdCampaign}
        title="Kampanye Aktif"
        value="3"
      />
      <CardOverview
        Icon={HiOutlineTrophy}
        title="Kampanye Selesai"
        value="7"
      />
    </div>
  );
}

export default AdminOverview;
