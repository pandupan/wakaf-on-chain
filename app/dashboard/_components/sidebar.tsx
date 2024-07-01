import React from 'react'
import Header from './header'
import SidebarMain from './sidebar-main';

interface IProps {
  children: React.ReactNode;
}

function Sidebar({ children }: IProps) {
  return (
    <>
      <div className="w-full lg:flex">
        <SidebarMain />
        <div className="w-full min-h-screen px-4 pt-2 pb-4 bg-slate-100">
          <Header />
          {children}
        </div>
      </div>
    </>
  )
}

export default Sidebar