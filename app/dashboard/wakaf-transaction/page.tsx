import React from 'react'
import DataTable from './_components/data-table'
import { auth } from '@/auth';
import { User } from '@prisma/client';
import { getUserByEmail } from '@/data/user';
import { redirect } from 'next/navigation';
import { getAllTransactions } from '@/data/transaction';
import { isAdmin } from '@/lib/utils';

const LIMIT = 9;

async function WakifPage() {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  const transactions = await getAllTransactions({
    sorted: 'updatedAt',
    limit: LIMIT
  });

  if (transactions === null) redirect('/error');

  return (
    <>
      <DataTable data={transactions} limit={LIMIT} />
    </>
  )
}

export default WakifPage