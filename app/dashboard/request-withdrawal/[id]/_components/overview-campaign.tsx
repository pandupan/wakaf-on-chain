import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'

function OverviewCampaign() {
  return (
    <div className="p-4 border rounded-md space-y-2">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-full sm:w-[250px] aspect-[4/3] rounded bg-muted overflow-hidden">
          {/* <img
            src="/"
            alt="campaign image"
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="w-full">
          <span className="block text-xs sm:text-sm text-secondary capitalize">
            Kategori
          </span>
          <h3 className="text-sm sm:text-base font-semibold leading-5">
            Judul Kampanye
          </h3>
          <Link href="/dashboard/campaign/1">
            <Button size="sm" variant="secondary" className="text-xs h-auto py-1.5 rounded mt-2">
              Detail
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OverviewCampaign
