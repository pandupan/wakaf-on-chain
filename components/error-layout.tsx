import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { auth } from '@/auth';
import { Separator } from './ui/separator';
import { logout } from '@/actions/logout';

interface IProps {
  title: string;
  description: string;
}

async function ErrorLayout({ description, title }: IProps) {
  const session = await auth();

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto text-center">
          <div className="pb-6">
            <div className="flex items-center gap-2 justify-center">
              <Link href="/" className="relative block w-[80px] aspect-square">
                <Image
                  src="/logo.jpeg"
                  alt="logo"
                  fill={true}
                />
              </Link>
              <div className="flex flex-col">
                <h1 className="leading-4 font-semibold text-secondary">PPM Al Ihsan</h1>
                <span className="inline-block text-sm">Tasikmalaya</span>
              </div>
            </div>
          </div>
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            {title}
          </h3>
          <p className="text-gray-600 mt-3">
            {description}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/">
              <Button size="sm" variant="outline" className="gap-2 font-normal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                Kembali
              </Button>
            </Link>
            {session?.user && (
              <Link href="/dashboard">
                <Button size="sm" variant="secondary" className="font-normal">
                  Bawa ke beranda
                </Button>
              </Link>
            )}
          </div>
          {session?.user && (
            <div className="mt-3">
              <div className="relative py-3 mb-2">
                <span className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] block bg-background px-4 text-sm">
                  ATAU
                </span>
                <Separator />
              </div>
              <form action={logout}>
                <Button type="submit" size="sm" variant="destructive" className="font-normal">
                  Logout
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ErrorLayout