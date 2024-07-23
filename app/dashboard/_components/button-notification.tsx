'use client'

import { IoMdNotificationsOutline } from 'react-icons/io'
import useSidebarStore from '../_stores/useSidebarStore'

function ButtonNotification() {
  const { toggleNotification } = useSidebarStore()

  return (
    <button className="p-1 rounded-full text-lg hover:bg-muted transition" onClick={toggleNotification}>
      <IoMdNotificationsOutline />
    </button>
  )
}

export default ButtonNotification