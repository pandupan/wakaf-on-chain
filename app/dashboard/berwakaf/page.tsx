import OverviewCampaign from './_components/overview-campaign'
import HowToWakaf from './_components/how-to-wakaf'
import FormBerwakaf from './_components/form-berwakaf'
import { Campaign } from '@prisma/client';
import { getCampaignById } from '@/data/campaign';
import { FormTypes } from './_types';
import { auth } from '@/auth';

interface IProps {
  searchParams: {
    campaign_id?: string;
  }
}

async function BerwakafPage({ searchParams }: IProps) {
  const session = await auth();

  let selectedCampaign: Omit<Campaign, 'description'> | null = null;
  const { campaign_id } = searchParams;
  if (campaign_id && !isNaN(+campaign_id)) {
    selectedCampaign = await getCampaignById(+campaign_id, {
      withoutDescription: true
    });
  }

  const initialForm: FormTypes = {
    step1: {
      amount: 0
    },
    step2: {
      paymentMethodId: null,
      paymentMethodLabel: null,
      paymentLogo: '',
    },
    step3: {
      name: session?.user.name || '',
      email: session?.user.email || '',
      isHiddenName: false,
      message: ''
    },
  }

  return (
    <div className="w-full grid items-start grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-5">
        <OverviewCampaign data={selectedCampaign} />
      </div>
      <div className="col-span-12 md:col-span-7">
        <FormBerwakaf
          data={selectedCampaign}
          initialForm={initialForm}
          user={session?.user!}
          campaignId={!!selectedCampaign ? selectedCampaign.id : null}
        />
      </div>
      <div className="p-4 sm:p-6 rounded-lg bg-background col-span-12 md:hidden">
        <HowToWakaf />
      </div>
    </div>
  )
}

export default BerwakafPage