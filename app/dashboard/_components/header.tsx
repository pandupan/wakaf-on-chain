'use client'

import React from 'react'
import { HeaderBreadcrumb } from './header-breadcrumb'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { IoMdNotificationsOutline } from "react-icons/io"
import { MdOutlineHelpOutline } from 'react-icons/md'
import { IoClose, IoMenu } from "react-icons/io5"
import useSidebarStore from '../_stores/useSidebarStore'

function Header() {
  const { toggleSidebar, isOpen } = useSidebarStore()

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-end gap-x-2 gap-y-4 justify-between pb-4">
      <HeaderBreadcrumb />
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <div className="flex gap-2 items-center p-1.5 rounded-full bg-background shadow-xl shadow-foreground/5">
          <div className="space-x-0.5">
            <button className="p-1 rounded-full text-lg hover:bg-muted transition">
              <IoMdNotificationsOutline />
            </button>
            <button className="p-1 rounded-full text-lg hover:bg-muted transition">
              <MdOutlineHelpOutline />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm">Halo, <b>User</b>!</span>
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <button
          className="lg:hidden h-full aspect-square p-2 rounded-full bg-background shadow-xl shadow-foreground/5"
          onClick={toggleSidebar}
        >
          {isOpen ? <IoClose className="text-xl" /> : <IoMenu className="text-xl" />}
        </button>
      </div>
    </div>
  )
}

export default Header