import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const popinsPoppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Wakaf On Chain | Ponpes Al-Ihsan Tasikmalaya',
  description: 'Memberikana layanan kemudahan dalam pendistribusikan wakaf secara transparan dan aman pada Pondok Pesantren Al-Ihsan Tasikmalya dengan melakukan difusi teknologi informasi berbasis blockchain. ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={popinsPoppins.className}>
        <div className="overflow-hidden">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
