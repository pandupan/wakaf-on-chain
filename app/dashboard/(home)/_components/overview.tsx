import React from 'react'
import CardOverview from './overview-card'
import { BsCurrencyDollar } from "react-icons/bs"
import { FaHandHoldingUsd } from 'react-icons/fa'
import { HiOutlineTrophy } from "react-icons/hi2"

function Overview() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardOverview
        Icon={BsCurrencyDollar}
        title="Jumlah Berwakaf"
        value="Rp1.200.000"
      />
      <CardOverview
        Icon={FaHandHoldingUsd}
        title="Total Berwakaf"
        value="5 Kali"
      />
      <CardOverview
        Icon={HiOutlineTrophy}
        title="Peringkat"
        value="99+"
      />
    </div>
  )
}

export default Overview