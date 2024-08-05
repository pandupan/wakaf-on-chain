import React from 'react'
import FormWithdraw from './form-withdraw'
import { getWithdrawListCampaigns } from '@/data/campaign'
import { getAllWithdrawalAccounts } from '@/data/withdrawal-account';
import { redirect } from 'next/navigation';
import { FormTypes } from '../_types';

const initialForm: FormTypes = {
  campaignId: null,
  amount: 0,
  withdrawAccountId: null,
  description: ''
}

async function FormWithdrawLayout() {
  const campaigns = await getWithdrawListCampaigns();
  const withdrawalAccounts = await getAllWithdrawalAccounts();

  if (!campaigns || !withdrawalAccounts) redirect('/error');

  return (
    <FormWithdraw
      campaigns={campaigns}
      withdrawalAccounts={withdrawalAccounts}
      initialValues={initialForm}
    />
  )
}

export default FormWithdrawLayout