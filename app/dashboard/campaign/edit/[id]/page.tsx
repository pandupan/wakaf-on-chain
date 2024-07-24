import React from 'react'
import FormCampaign from '../../../campaign/_components/form-campaign'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import { getCampaignById } from '@/data/campaign';
import { User } from '@prisma/client';
import { getUserByEmail } from '@/data/user';
import { isAdmin } from '@/lib/utils';

interface IParams {
  id: string;
};

async function EditPage({ params }: { params: IParams }) {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  if (isNaN(+params.id)) redirect('/404');

  const campaign = await getCampaignById(+params.id, {});

  if (campaign === null || campaign.status === 'REACHED') redirect('/404');

  return (
    <div className="p-4 rounded-lg bg-background">
      <FormCampaign mode="edit" data={campaign} />
    </div>
  )
}

export default EditPage