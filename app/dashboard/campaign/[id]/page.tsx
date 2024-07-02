import React from 'react'
import CampaignOverview from './_components/campaign-overview'
import Donator from './_components/donator'

const page = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-7">
        <CampaignOverview />
      </div>
      <div className="col-span-12 md:col-span-5">
        <Donator />
      </div>
    </div>
  )
}

export default page
