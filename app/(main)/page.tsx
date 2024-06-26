import Hero from '@/app/(main)/_components/hero'
import AboutUs from '@/app/(main)/_components/about-us'
import Facilities from '@/app/(main)/_components/facilities'
import ContactUs from '@/components/contact-us'
import PengurusPondok from './_components/admin-pondok'

const page = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <PengurusPondok />
      <Facilities />
      <ContactUs />
    </>
  )
}

export default page
