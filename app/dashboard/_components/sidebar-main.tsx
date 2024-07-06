'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SidebarNav from './sidebar-nav'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IoIosLogOut } from 'react-icons/io'
import useSidebarStore from '../_stores/useSidebarStore'
import { User, UserRole } from '@prisma/client'
import { logout } from '@/actions/logout'

interface IProps {
  role: UserRole | null;
}

function SidebarMain({ role }: IProps) {
  const { isOpen, closeSidebar } = useSidebarStore()

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLDivElement;

        // If the click target is outside the element with id #idElement
        if (target && (target.closest('#sidebar') === null)) {
          closeSidebar();
        }
      }

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      }
    }
  }, [isOpen]);

  return (
    <>
      <div className="relative hidden lg:block">
        <div className="w-64 h-screen"></div>
      </div>
      <aside
        id="sidebar"
        className={cn(
          'fixed w-64 left-0 h-screen space-y-6 bg-background border-r z-[1] shadow-xl lg:shadow-none transition-all duration-500 ease-in-out',
          isOpen ? '' : '-translate-x-[120%] lg:translate-x-0'
        )}
      >
        <div className="w-full h-full p-4 flex flex-col justify-between gap-4 overflow-y-auto">
          <div>
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
              <SidebarNav role={role} />
            </div>
          </div>
          <div className="w-full">

          </div>
          {!!role ? (
            <form action={logout}>
              <Button type="submit" size="sm" variant="destructive" className="w-full text-xs font-normal gap-2">
                Logout
                <IoIosLogOut className="text-sm" />
              </Button>
            </form>
          ) : (
            <Link href="/auth/login">
              <Button size="sm" variant="secondary" className="w-full text-xs font-normal gap-2">
                Login
              </Button>
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}

export default SidebarMain