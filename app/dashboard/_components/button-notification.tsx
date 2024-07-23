'use client'

import { IoMdNotificationsOutline } from 'react-icons/io'
import useSidebarStore from '../_stores/useSidebarStore'

interface IProps {
  unread: number;
}

function ButtonNotification({ unread }: IProps) {
  const { toggleNotification } = useSidebarStore()

  return (
    <button
      className="relative p-1 rounded-full text-lg hover:bg-muted transition"
      onClick={toggleNotification}
    >
      {!!unread && (
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
          {unread > 99 ? 99 : unread}
        </span>
      )}
      <IoMdNotificationsOutline />
    </button>
  )
}

export default ButtonNotification