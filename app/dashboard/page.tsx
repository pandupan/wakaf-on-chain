import WakafForm from '@/app/dashboard/_components/wakaf-form'
import WakafTable from '@/app/dashboard/_components/wakaf-table'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 items-center justify-center">
      <WakafTable />
      <WakafForm />
    </div>
  )
}

export default page
