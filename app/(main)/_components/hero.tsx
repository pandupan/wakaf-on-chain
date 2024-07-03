import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"

const Hero = () => {
  return (
    <section className="relative container mt-24 lg:mt-0 lg:h-screen max-h-[800px] pb-10 items-center flex flex-col-reverse lg:flex-row md:px-8 gap-10 z-[1]">
      <div className="space-y-4 flex-1 sm:text-center lg:text-left">
        <h1 className="text-gray-800 font-bold text-3xl sm:text-5xl xl:text-6xl">
          PP Mahasiswa
          <br />
          <span className="text-secondary"><i>Al-Ihsan</i> Tasikmalaya</span>
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          Pondok Pesantren Al-Ihsan Tasikmalaya, di Kecamatan Cipedes, memberikan pendidikan Islam gratis kepada santri putra dan putri. Fokus kami adalah kajian kitab, tahfidz Quran, dan pengembangan softskill serta hardskill.
        </p>
        <div className="w-full sm:flex sm:items-center sm:gap-3">
          <Link href="/wakaf">
            <Button variant="secondary" className="w-full sm:w-auto">
              Mari berwakaf
            </Button>
          </Link>
          <Link href="/#about">
            <Button variant="outline" className="gap-2 w-full sm:w-auto mt-3 sm:mt-0">
              Tentang Kami <FaArrowRightLong />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 text-center mt-4 rounded-lg overflow-hidden">
        <img src="https://picsum.photos/id/83/1600/900" className="w-full mx-auto sm:w-10/12  lg:w-full" />
      </div>
    </section>
  )
}

export default Hero