import React from 'react'
import Overview from './_components/overview'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Campaign from './_components/campaign'

const HomeDashboardPage = () => {
  return (
    <div className="space-y-4">
      <Link href="/dashboard/berwakaf">
        <Button size="sm" variant="secondary" className="text-xs">
          Ayo Berwakaf
        </Button>
      </Link>
      <Overview />
      <Campaign />
    </div>
  )
}

export default HomeDashboardPage
