'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
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
                Ups... Internal Error!
              </h3>
              <p className="text-gray-600 mt-3">
                {error.message}
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
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}