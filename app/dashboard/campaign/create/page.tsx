import React from 'react'
import FormAddCampaign from '../../campaign/_components/form-campaign'
import { auth } from '@/auth';
import { User } from '@prisma/client';
import { getUserByEmail } from '@/data/user';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/utils';

async function AddCampaignPage() {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  return (
    <div className="p-4 rounded-lg bg-background">
      <FormAddCampaign mode="create" />
    </div>
  )
}

export default AddCampaignPage