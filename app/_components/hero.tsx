import { Button } from "@/components/ui/button"
import { FaArrowRightLong } from "react-icons/fa6"

const HeroSectionHP = () => {
  return (
    <section className="relative container mt-24 lg:mt-0 lg:h-screen max-h-[800px] pb-10 items-center flex flex-col-reverse lg:flex-row md:px-8 gap-10 z-[1]">
      <div className="space-y-4 flex-1 sm:text-center lg:text-left">
        <h1 className="text-gray-800 font-bold text-3xl sm:text-6xl xl:text-6xl">
          PP Mahasiswa
          <br />
          <span className="text-indigo-600">Al-Ihsan Tasikmalaya</span>
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          Pondok Pesantren Al-Ihsan Tasikmalaya, di Kecamatan Cipedes, memberikan pendidikan Islam gratis kepada santri putra dan putri. Fokus kami adalah kajian kitab, tahfidz Quran, dan pengembangan softskill serta hardskill.
        </p>
        <div className="items-center gap-x-3 flex">
          <Button variant="secondary">
            Mari berwakaf
          </Button>
          <Button variant="outline" className="gap-2">
            Tentang Kami <FaArrowRightLong />
          </Button>
        </div>
      </div>
      <div className="flex-1 text-center mt-4 rounded-lg overflow-hidden">
        <img src="https://picsum.photos/id/83/1600/900" className="w-full mx-auto sm:w-10/12  lg:w-full" />
      </div>
    </section>
  )
}

export default HeroSectionHP