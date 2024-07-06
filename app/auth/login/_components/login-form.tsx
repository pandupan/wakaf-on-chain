'use client'

import { signIn } from "next-auth/react"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FcGoogle } from "react-icons/fc"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const handleSignIn = () => {
    signIn('google', {
      callbackUrl: decodeURIComponent(callbackUrl || '') || DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="w-[90%] sm:w-full max-w-md p-8 sm:p-10 rounded-lg bg-secondary-foreground space-y-6 shadow-lg">
      <Link href="/">
        <Button variant="ghost" className="p-0 h-auto hover:bg-secondary-foreground">
          <FaArrowLeftLong />
        </Button>
      </Link>
      <div className="space-y-4">
        <Image
          src="/logo.jpeg"
          alt="logo"
          width={64}
          height={64}
          className="mx-auto rounded-lg"
        />
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold">
            Sudah siap untuk berbuat kebaikan?
          </h1>
          <p className="leading-5 text-gray-500 text-sm sm:text-base">
            Masuk ke akun email anda dan mulai berwakaf untuk membantu sesama!
          </p>
        </div>
      </div>
      <Button className="gap-2 w-full" onClick={handleSignIn}>
        <FcGoogle fontSize={20} /> Masuk dengan Google
      </Button>
      <p className="text-xs sm:text-sm leading-[18px]">
        <b>Catatan:</b> Autentikasi ini bertujuan untuk membuat segala kegiatan wakaf menjadi transparan.
      </p>
    </div>
  )
}

export default LoginForm