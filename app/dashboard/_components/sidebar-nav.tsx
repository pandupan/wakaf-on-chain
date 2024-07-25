'use client'

import React from 'react'
import { sidebarNavItems } from '../_constants/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { isDivider } from '@/lib/predict-type'
import { UserRole } from '@prisma/client'
import useSidebarStore from '../_stores/useSidebarStore'

interface IProps {
  role: UserRole | null;
}

function SidebarNav({ role }: IProps) {
  const { isOpen, closeSidebar } = useSidebarStore()
  const pathname = usePathname()

  return (
    <nav className="w-full flex flex-col gap-2">
      {sidebarNavItems.map((item, index) =>
        isDivider(item) ? (
          <hr key={index} className="border-gray-200 dark:border-gray-600" />
        ) : (item.role === role ||
          item.role === 'PUBLIC' ||
          (!!role && item.role === 'BOTH') ||
          (role === 'SUPER_ADMIN' && item.role === 'ADMIN')
        ) ? (
          <Link
            key={index}
            className={cn(
              'flex items-center px-4 py-3 rounded-md',
              (item.href === '/dashboard' ? pathname === item.href : pathname.includes(item.href)) ?
                'text-secondary-foreground bg-secondary' :
                'transition-colors duration-300 transform hover:bg-gray-100 hover:text-gray-700'
            )}
            href={item.href}
            onClick={() => {
              if (isOpen) closeSidebar();
            }}
          >
            {item.icon && <item.icon fontSize={20} />}
            <span className="mx-4 font-medium text-sm">{item.text}</span>
          </Link>
        ) : null
      )}
    </nav>
  )
}

export default SidebarNav