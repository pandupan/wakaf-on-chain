import React from 'react'
import CampaignOverview from './_components/campaign-overview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BiDetail } from 'react-icons/bi'
import { PiCoins } from "react-icons/pi"
import Description from './_components/description'
import WakafFlowWithdraw from './_components/wakaf-flow-withdraw'
import { redirect } from 'next/navigation'
import { getCampaignById } from '@/data/campaign'
import { auth } from '@/auth'
import ContactCampaign from '../../../../components/shared/contact-campaign'
import WakifListContainer from './_components/wakif-list-container'
import CommentSection from './_components/comment-section'
import { getCampaignCommentsByCampaignId } from '@/data/comment'
import { User } from '@prisma/client'
import { getUserById } from '@/data/user'

interface IParams {
  id: string;
};

const COMMENT_LIMIT = 10;

const CampaignDetailPage = async ({ params }: { params: IParams }) => {
  const session = await auth();
  let user: User | null = null;

  if (session?.user) {
    user = await getUserById(session.user.id!);
  }

  if (isNaN(+params.id)) redirect('/404');

  const campaign = await getCampaignById(+params.id, {
    includeUser: true,
  });

  if (campaign === null) redirect('/404');

  const comments = await getCampaignCommentsByCampaignId(campaign.id, {
    limit: COMMENT_LIMIT
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-7">
        <CampaignOverview data={campaign} role={user?.role || null} />
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
              <Description data={campaign.description} />
            </TabsContent>
            <TabsContent value="balance-flow">
              <WakafFlowWithdraw />
            </TabsContent>
          </Tabs>
        </div>
        <CommentSection
          campaignId={campaign.id}
          data={comments}
          user={user}
          limit={COMMENT_LIMIT}
        />
      </div>
      <div className="col-span-12 md:col-span-5 space-y-4">
        <ContactCampaign phone={campaign.phone} />
        <WakifListContainer campaignId={campaign.id} />
      </div>
    </div>
  )
}

export default CampaignDetailPage
