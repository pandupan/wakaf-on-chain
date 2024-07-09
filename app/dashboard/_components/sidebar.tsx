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
  let role: UserRole | null = null;

  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user) redirect('/404');
    role = user.role;
  }

  return (
    <div className="w-full flex">
      <SidebarMain role={role} />
      <div className="w-full min-h-screen px-4 pt-2 pb-4 bg-slate-100">
        <div className="max-w-[1500px] h-full flex flex-col mx-auto">
          <Header user={user} />
          <div className="flex-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar