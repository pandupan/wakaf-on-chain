import React from 'react'
import { auth } from '@/auth'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { getUserById } from '@/data/user'
import AdminLayout from './_layouts/admin-layout'
import UserLayout from './_layouts/user-layout'
import { isAdmin } from '@/lib/utils'

const HomeDashboardPage = async () => {
  const session = await auth();
  let role: UserRole | null = null;

  if (!!session?.user.email!) {
    const user = await getUserById(session?.user.id!);
    if (!user) redirect('/404');
    role = user.role;
  }

  if (isAdmin(role!)) return <AdminLayout />

  return <UserLayout userId={session?.user.id!} />
}

export default HomeDashboardPage
