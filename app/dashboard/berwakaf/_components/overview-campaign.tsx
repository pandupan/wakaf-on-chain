import CardCampaign from '@/components/shared/card-campaign'
import React from 'react'
import HowToWakaf from './how-to-wakaf'
import { Button } from '@/components/ui/button'
import { Campaign } from '@prisma/client';
import Link from 'next/link';

interface IProps {
  data: Omit<Campaign, 'description'> | null;
}

function OverviewCampaign({ data }: IProps) {
  return (
    <div className="bg-background p-4 sm:p-6 lg:p-4 xl:p-6 rounded-xl shadow-sm space-y-6">
      <div className="space-y-1">
        <h1 className="font-extrabold tracking-wide">Kampanye terpilih:</h1>
        {data ? (
          <div className="relative">
            <CardCampaign
              data={data}
              onlyView
              className="border shadow-none"
            />
            {data.status !== 'RUNNING' && (
              <div className="absolute inset-0 bg-secondary/10 backdrop-blur-sm rounded-md flex items-center justify-center">
                <div className="space-y-2 text-center">
                  <p className="px-2 sm:px-4 text-sm sm:text-base">
                    Kampanye ini sudah selesai atau ditutup oleh penyelenggara!
                  </p>
                  <Link href="/dashboard/campaign" className="inline-block">
                    <Button size="sm" variant="secondary" className="rounded-full text-xs">
                      Pilih kampanye lain
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-video rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="px-2 sm:px-4 text-sm sm:text-base">Kamu belum memilih kampanye</p>
              <Link href="/dashboard/campaign" className="inline-block">
                <Button size="sm" variant="secondary" className="rounded-full text-xs">
                  Pilih kampanye
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <HowToWakaf className="hidden md:block" />
    </div>
  )
}

export default OverviewCampaign