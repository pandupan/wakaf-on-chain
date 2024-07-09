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
import { User } from '@prisma/client'
import { abbreviateName, getInitials } from '@/lib/utils'
import NotificationSheet from './notification-sheet'

interface IProps {
  user: User | null;
}

function Header({ user }: IProps) {
  const { toggleSidebar, isOpen, toggleNotification } = useSidebarStore()

  return (
    <div className="flex flex-col-reverse md:flex-row md:items-end gap-x-2 gap-y-4 justify-between pb-4">
      <HeaderBreadcrumb />
      <div className="flex items-center gap-2 self-end md:self-auto">
        {!!user && (
          <div className="flex gap-2 items-center p-1.5 rounded-full bg-background shadow-xl shadow-foreground/5">
            <div className="space-x-0.5">
              <button className="p-1 rounded-full text-lg hover:bg-muted transition" onClick={toggleNotification}>
                <IoMdNotificationsOutline />
              </button>
              <button className="p-1 rounded-full text-lg hover:bg-muted transition">
                <MdOutlineHelpOutline />
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm">
                Halo,
                <b>
                  <span className="hidden sm:inline"> {user.name}</span>
                  <span className="sm:hidden"> {abbreviateName(user.name || '')}</span>
                </b>
              </p>
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.image || ''} alt="profile image" />
                <AvatarFallback>{getInitials(user.name!)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        )}
        <button
          className="lg:hidden md:h-full aspect-square p-2 rounded-full bg-background shadow-xl shadow-foreground/5"
          onClick={toggleSidebar}
        >
          {isOpen ? <IoClose className="text-xl" /> : <IoMenu className="text-xl" />}
        </button>
      </div>
      <NotificationSheet />  {/* Add the NotificationSheet component */}
    </div>
  )
}

export default Header
