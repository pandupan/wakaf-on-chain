import React from 'react'
import DataTable from './_components/data-table'
import { auth } from '@/auth';
import { User } from '@prisma/client';
import { getUserByEmail } from '@/data/user';
import { redirect } from 'next/navigation';

async function WakifPage() {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || user.role !== 'ADMIN') redirect('/404');
  }

  return (
    <div className="p-4 rounded-lg bg-background">
      <DataTable />
    </div>
  )
}

export default WakifPage