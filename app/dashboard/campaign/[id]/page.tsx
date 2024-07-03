import React from 'react'
import CampaignOverview from './_components/campaign-overview'
import Donator from './_components/donator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BiDetail } from 'react-icons/bi'
import { PiCoins } from "react-icons/pi"
import Description from './_components/description'
import WakafFlowWithdraw from './_components/wakaf-flow-withdraw'

const page = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-7">
        <CampaignOverview />
        <div className="bg-background rounded-md shadow-sm p-4 space-y-2 mt-4">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description" className="gap-2">
                <BiDetail className="text-base" />
                Deksripsi
              </TabsTrigger>
              <TabsTrigger value="balance-flow" className="gap-2">
                <PiCoins className="text-base" />
                Pencairan Dana
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Description />
            </TabsContent>
            <TabsContent value="balance-flow">
              <WakafFlowWithdraw />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5">
        <Donator />
      </div>
    </div>
  )
}

export default page
