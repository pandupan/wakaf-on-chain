import { auth } from '@/auth'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="overflow-x-hidden">
      <Navbar isAuthenticated={isAuthenticated} />
      {children}
      <Footer />
    </div>
  )
}
