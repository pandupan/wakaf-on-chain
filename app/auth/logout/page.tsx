'use client'

import React, { useEffect, useTransition } from 'react'
import Loading from './_components/loading'
import { useRouter } from 'next/navigation';
import { logout } from '@/actions/logout';

function LogoutPage() {
  const [logouting, startLogout] = useTransition()
  const navigate = useRouter();

  useEffect(() => {
    startLogout(() => {
      logout()
        .then(() => {
          navigate.push('/auth/login');
        })
    })
  }, []);

  return (
    <div className="bg-secondary min-h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default LogoutPage