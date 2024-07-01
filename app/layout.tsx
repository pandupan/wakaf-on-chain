import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Pondok Pesantren Mahasiswa Al-Ihsan Tasikmalaya',
  description: 'Memberikana layanan kemudahan dalam pendistribusikan wakaf secara transparan dan aman pada Pondok Pesantren Al-Ihsan Tasikmalya dengan melakukan difusi teknologi informasi berbasis blockchain. ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  )
}
