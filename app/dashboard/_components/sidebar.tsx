import React from 'react'
import Header from './header'
import SidebarMain from './sidebar-main';
import { auth } from '@/auth';
import { User, UserRole } from '@prisma/client';
import { getUserByEmail } from '@/data/user';
import { redirect } from 'next/navigation';

interface IProps {
  children: React.ReactNode;
}

async function Sidebar({ children }: IProps) {
  const session = await auth();
  const role: UserRole | null = session?.user.role || null;

  let user: User | null = null;

  if (!!role) {
    user = await getUserByEmail(session?.user.email!);
    if (!user) redirect('/auth/logout');
  }

  return (
    <>
      <div className="w-full lg:flex">
        <SidebarMain role={role} />
        <div className="w-full min-h-screen px-4 pt-2 pb-4 bg-slate-100">
          <Header user={user} />
          {children}
        </div>
      </div>
    </>
  )
}

export default Sidebar