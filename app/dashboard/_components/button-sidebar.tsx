'use client'

import { IoClose, IoMenu } from 'react-icons/io5';
import useSidebarStore from '../_stores/useSidebarStore';

function ButtonSidebar() {
  const { toggleSidebar, isOpen } = useSidebarStore();

  return (
    <button
      className="lg:hidden md:h-full aspect-square p-2 rounded-full bg-background shadow-xl shadow-foreground/5"
      onClick={toggleSidebar}
    >
      {isOpen ? <IoClose className="text-xl" /> : <IoMenu className="text-xl" />}
    </button>
  )
}

export default ButtonSidebar