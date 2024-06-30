import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
