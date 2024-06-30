import Hero from '@/app/wakaf/_components/hero'
import WhatIsWakaf from '@/app/wakaf/_components/what-is-wakaf'
import OurPlatform from './_components/our-platform'
import ContactUs from '@/components/contact-us'
import CallToAction from './_components/call-to-action'
import PengurusPondok from '../_components/admin-pondok'
import TopWakif from './_components/top-wakif'

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsWakaf />
      <OurPlatform />
      <TopWakif/>
      <CallToAction />
      <ContactUs />
    </>
  )
}
