import React from 'react'
import UserOverview from '../_components/user-overview'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Campaign from '../_components/campaign'

interface IProps {
  userId: string;
}

const UserLayout: React.FC<IProps> = async ({ userId }) => {
  return (
    <div className="space-y-4">
      <Link href="/dashboard/berwakaf">
        <Button size="sm" variant="secondary" className="text-xs">
          Ayo Berwakaf
        </Button>
      </Link>
      <UserOverview userId={userId} />
      <Campaign />
    </div>
  )
}

export default UserLayout
