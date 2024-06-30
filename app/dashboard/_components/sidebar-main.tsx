'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SidebarNav from './sidebar-nav'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IoIosLogOut } from 'react-icons/io'

interface IProps {
  display: boolean;
}

function SidebarMain({ display }: IProps) {
  return (
    <div id="sidebar" className="fixed left-0 top-0 lg:static z-50">
      <aside
        className={cn(
          'flex flex-col w-64 h-screen p-4 overflow-y-auto bg-white border-r shadow-md shadow-foreground/5 lg:shadow-none transition-transform duration-500 ease-in-out',
          display ? '' : '-translate-x-[120%] lg:translate-x-0'
        )}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="relative block w-[50px] sm:w-[60px] aspect-square rounded-md overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="logo"
              fill={true}
            />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-sm leading-4 font-semibold text-secondary">PPM Al Ihsan</h1>
            <span className="inline-block text-xs">Tasikmalaya</span>
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 mt-6">
          <SidebarNav />
        </div>
        <div className="w-full self-end">
          <Button size="sm" variant="destructive" className="w-full text-xs font-normal gap-2">
            Logout
            <IoIosLogOut className="text-sm" />
          </Button>
        </div>
      </aside>
    </div>
  )
}

export default SidebarMain