import React from 'react'
import Overview from './_components/overview'
import IncomeChart from '@/components/shared/income-chart'

const page = () => {
  return (
    <div>
      <Overview />
      <div className='rounded-xl p-4 bg-background mt-4 shadow-sm'>
        <h1 className="text-xl font-semibold">Pemasukan Wakaf 1 Tahun Terakhir</h1>
        <IncomeChart />
      </div>
    </div>
  )
}

export default page
