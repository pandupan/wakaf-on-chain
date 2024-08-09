import React from 'react'
import DataTable from './_components/data-table'
import { auth } from '@/auth';
import { User } from '@prisma/client';
import { getUserByEmail } from '@/data/user';
import { isAdmin } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { getAllWithdrawalRequests } from '@/data/withdrawal-request';

const LIMIT = 10;

const RequestWithdrawalPage = async () => {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  const withdrawalRequests = await getAllWithdrawalRequests({
    sorted: 'updatedAt',
    limit: LIMIT
  });

  if (withdrawalRequests === null) redirect('/error');

  return (
    <DataTable limit={LIMIT} data={withdrawalRequests} />
  )
}

export default RequestWithdrawalPage
