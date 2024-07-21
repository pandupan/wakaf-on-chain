import React from 'react'
import AdminOverview from '../_components/admin-overview'
import IncomeChart from '@/components/shared/income-chart'

const AdminLayout = () => {
  return (
    <div>
      <AdminOverview />
      <div className="w-full rounded-xl p-4 bg-background mt-4 shadow-sm">
        <h1 className="text-xl font-semibold">Pemasukan Wakaf 1 Tahun Terakhir</h1>
        <IncomeChart />
      </div>
    </div>
  )
}

export default AdminLayout
