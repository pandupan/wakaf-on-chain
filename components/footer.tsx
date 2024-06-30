import Link from "next/link";
import { Button } from "./ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {

  const footerNavs = [
    {
      href: '/',
      name: 'Beranda'
    },
    {
      href: '/wakaf',
      name: 'Wakaf'
    },
    {
      href: '/#about',
      name: 'Tentang Kami'
    },
    {
      href: '/#contact',
      name: 'Kontak'
    }
  ]
  return (
    <footer className="pt-10">
      <div className="container text-gray-600">
        <div className="space-y-6 sm:max-w-xl sm:mx-auto sm:text-center">
          <div className="relative w-32 aspect-square sm:mx-auto rounded-md overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="logo"
              className="object-cover"
              fill={true}
            />
          </div>
          <p>
            Pondok Pesantren Al-Ihsan Tasikmalaya dengan fokus pada kajian kitab, tahfidz Quran, dan pengembangan softskill serta hardskill.
          </p>
          <div className="items-center justify-center gap-x-3 flex">
            <Button variant="secondary">
              Mari berwakaf
            </Button>
            <Button variant="outline" className="gap-2">
              Tentang Kami <FaArrowRightLong />
            </Button>
          </div>
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p>© 2024 PPM Al-Ihsan Tasik. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
            {
              footerNavs.map((item, idx) => (
                <li key={`f-nav-${idx}`} className="text-gray-800 hover:text-gray-500 duration-150">
                  <Link href={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
