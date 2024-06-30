import React from 'react'
import CardOverview from './overview-card'
import { BsCurrencyDollar } from "react-icons/bs"
import { FaHandHoldingUsd } from 'react-icons/fa'
import { HiOutlineTrophy } from "react-icons/hi2"
import { Button } from '@/components/ui/button'

function Overview() {
  return (
    <main className="space-y-4">
      <Button size="sm" variant="secondary" className="text-xs">
        Ayo Berwakaf
      </Button>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
    </main>
  )
}

export default Overview