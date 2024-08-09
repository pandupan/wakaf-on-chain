import React from 'react'
import { BsCashCoin, BsCurrencyDollar } from "react-icons/bs"
import { FaHandHoldingUsd } from 'react-icons/fa'
import { MdCampaign, MdDisabledVisible } from "react-icons/md"
import CardOverview from '../../../../components/shared/overview-card'
import { LuUser2 } from 'react-icons/lu'
import { formatRupiah, numberPrefixer } from '@/lib/utils'
import { getAdminOverview } from '@/data/overview'
import { AiOutlineFileDone } from 'react-icons/ai'

async function AdminOverview() {
  const data = await getAdminOverview();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardOverview
        Icon={LuUser2}
        title="Total Pengguna"
        value={numberPrefixer(data.usersCount)}
      />
      <CardOverview
        Icon={FaHandHoldingUsd}
        title="Pengguna Berwakaf"
        value={`${numberPrefixer(data.berwakafCount || 0)}x`}
      />
      <CardOverview
        Icon={BsCashCoin}
        title="Total Pemasukan"
        value={formatRupiah(data.income || 0)}
      />
      <CardOverview
        Icon={BsCurrencyDollar}
        title="Wakaf tersedia"
        value={formatRupiah(data.availableBalance || 0)}
      />
      <CardOverview
        Icon={MdCampaign}
        title="Kampanye Aktif"
        value={`${data.activeCampaign}`}
      />
      <CardOverview
        Icon={AiOutlineFileDone}
        title="Kampanye Selesai"
        value={`${data.reachedCampaign}`}
      />
      <CardOverview
        Icon={MdDisabledVisible}
        title="Kampanye Dinonaktifkan"
        value={`${data.disabledCampaign}`}
      />
    </div>
  );
}

export default AdminOverview;
