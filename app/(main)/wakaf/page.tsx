import Hero from '@/app/(main)/wakaf/_components/hero'
import WhatIsWakaf from '@/app/(main)/wakaf/_components/what-is-wakaf'
import OurPlatform from './_components/our-platform'
import ContactUs from '@/components/contact-us'
import CallToAction from './_components/call-to-action'
import TopWakif from './_components/top-wakif'
import Statistic from './_components/statistic'
import HistoryLanding from './_components/history-landing'

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsWakaf />
      <OurPlatform />
      <TopWakif />
      <HistoryLanding/>
      <Statistic />
      <CallToAction />
      <ContactUs />
    </>
  )
}
