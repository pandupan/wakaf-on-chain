'use client'

import React from 'react'
import { sidebarNavItems } from '../_constants/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex flex-col gap-2">
      {sidebarNavItems.map((item, index) =>
        item.type === "divider" ? (
          <hr key={index} className="border-gray-200 dark:border-gray-600" />
        ) : (
          <Link
            key={index}
            className={cn(
              'flex items-center px-4 py-3 rounded-md',
              pathname === item.href ? 'text-secondary-foreground bg-secondary' : 'transition-colors duration-300 transform hover:bg-gray-100 hover:text-gray-700'
            )}
            href={`${item.href}`}
          >
            {!!item.icon && <item.icon fontSize={20} />}
            <span className="mx-4 font-medium text-sm">{item.text}</span>
          </Link>
        )
      )}
    </nav>
  )
}

export default SidebarNav