import React from 'react'
import Overview from './_components/overview'
import IncomeChart from '@/components/shared/income-chart'

const page = () => {
  return (
    <div>
      <Overview />
      <div className='rounded-xl p-4 bg-background mt-4 shadow-sm'>
        <h2 className='font-bold text-secondary'>Pemasukan Wakaf 1 Tahun Terakhir</h2>
        <IncomeChart />
      </div>
    </div>
  )
}

export default page
