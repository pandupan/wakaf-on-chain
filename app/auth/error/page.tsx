import ErrorLayout from '@/components/error-layout'
import React from 'react'

function ErrorPage() {
  return (
    <ErrorLayout
      title="Ohh Tidak... 500"
      description="Maaf, terjadi kesalahan di server. Coba lagi sesaat!"
    />
  )
}

export default ErrorPage