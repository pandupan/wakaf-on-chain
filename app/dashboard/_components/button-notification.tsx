'use client'

import { IoMdNotificationsOutline } from 'react-icons/io'
import useSidebarStore from '../_stores/useSidebarStore'
import { useEffect } from 'react';

interface IProps {
  unread: number;
}

function ButtonNotification({ unread }: IProps) {
  const {
    toggleNotification,
    setUnreadNotification,
    unreadNotification
  } = useSidebarStore()

  useEffect(() => {
    setUnreadNotification(unread);
  }, [])

  return (
    <button
      className="relative p-1 rounded-full text-lg hover:bg-muted transition"
      onClick={toggleNotification}
    >
      {!!unreadNotification && (
        <span
          className="
            absolute 
            top-0 
            right-0 
            w-[14px]
            h-[14px]
            flex
            justify-center
            items-center
            bg-destructive 
            text-destructive-foreground 
            text-[9px] 
            rounded-full
          "
        >
          {unreadNotification > 99 ? 99 : unreadNotification}
        </span>
      )}
      <IoMdNotificationsOutline />
    </button>
  )
}

export default ButtonNotification