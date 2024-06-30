'use client'

import React, { useState } from 'react'
import Header from './header'
import SidebarMain from './sidebar-main';

interface IProps {
  children: React.ReactNode;
}

function Sidebar({ children }: IProps) {
  const [displaySidebar, setDisplaySidebar] = useState(false)

  return (
    <div className="flex bg-slate-100">
      <SidebarMain display={displaySidebar} />
      <div className="flex-auto px-4 py-2 min-h-screen lg:min-h-0">
        <Header
          sidebarDisplay={displaySidebar}
          onClickSidebarMenu={() => setDisplaySidebar((prev) => !prev)}
        />
        {children}
      </div>
    </div>
  )
}

export default Sidebar