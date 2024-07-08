import React from 'react'
import CardOverview from './card-overview'

function Overview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CardOverview
        className="bg-gradient-to-tr from-secondary to-lime-400 text-secondary-foreground"
        title="Wakaf Tersedia"
        value="Rp150.000.000"
      />
      <CardOverview
        className="bg-gradient-to-r from-violet-400 to-sky-400 text-secondary-foreground"
        title="Berhasil Tercairkan"
        value="Rp50.000.000"
      />
      <CardOverview
        className="shadow-sm bg-background"
        title="Bisa Dicairkan Dari"
        value="6 Kampanye"
      />
      <CardOverview
        className="shadow-sm bg-background"
        title="Total Pemasukan"
        value="Rp205.000.000"
      />
    </div>
  )
}

export default Overview