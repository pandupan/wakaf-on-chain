import OverviewCampaign from './_components/overview-campaign'
import HowToWakaf from './_components/how-to-wakaf'
import FormBerwakaf from './_components/form-berwakaf'
import { Campaign } from '@prisma/client';
import { getCampaignById } from '@/data/campaign';

interface IProps {
  searchParams: {
    campaign_id?: string;
  }
}

async function BerwakafPage({ searchParams }: IProps) {
  let selectedCampaign: Omit<Campaign, 'description'> | null = null;
  const { campaign_id } = searchParams;
  if (campaign_id && !isNaN(+campaign_id)) {
    selectedCampaign = await getCampaignById(+campaign_id, {
      withoutDescription: true
    });
  }

  return (
    <div className="w-full grid items-start grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-5">
        <OverviewCampaign data={selectedCampaign} />
      </div>
      <div className="col-span-12 md:col-span-7">
        <FormBerwakaf data={selectedCampaign} />
      </div>
      <div className="p-4 sm:p-6 rounded-lg bg-background col-span-12 md:hidden">
        <HowToWakaf />
      </div>
    </div>
  )
}

export default BerwakafPage