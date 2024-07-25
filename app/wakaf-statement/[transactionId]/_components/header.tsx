import { cn } from "@/lib/utils"
import { Gravitas_One } from "next/font/google"

const gravitasOne = Gravitas_One({
  subsets: ["latin"],
  weight: ["400"]
})

function Header() {
  return (
    <header className="text-center mb-0.5 border-b-[4px] border-double border-gray-800 pb-4">
      <h1 className={cn(
        'text-xl sm:text-2xl font-[900] uppercase text-[#7B9039] leading-6 md:leading-9',
        gravitasOne.className)
      }>
        Yayasan Al Ihsan Kudang Uyah{' '}
        <br className="hidden sm:block" />
        Kota Tasikmalaya
      </h1>
      <p className="text-[10px] sm:text-xs">
        Sekretariat : Jl. R.E. Martadinata Blk. No.222 Kudang Uyah Cipedes Kota Tasikmalaya 46133
      </p>
      <p className="text-xs sm:text-sm">
        Telpon: 082126641169 | Email: webppmalihsan@gmail.com
      </p>
    </header>
  )
}

export default Header