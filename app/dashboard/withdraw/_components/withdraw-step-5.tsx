import { Button } from '@/components/ui/button'
import { HiOutlineChevronDown } from 'react-icons/hi'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Separator } from '@/components/ui/separator'

function WithdrawStep5() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">5</span>
        <h1 className="text-lg font-bold">Rincian Informasi</h1>
      </div>
      <Alert variant="info">
        <AiOutlineExclamationCircle fontSize={22} />
        <AlertTitle>PENTING!</AlertTitle>
        <AlertDescription>
          Pastikan semua data sudah benar.
        </AlertDescription>
      </Alert>
      <div className="space-y-1">
        <div className="cursor-pointer rounded-lg border">
          <div className="flex items-center justify-between gap-2 p-2 shadow-sm">
            <div className="flex gap-2">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
              <div className="flex-auto flex flex-col justify-between">
                <div>
                  <h2 className="text-xs font-bold">BRI</h2>
                  <span className="block text-secondary font-bold tracking-wide">
                    320810018003
                  </span>
                </div>
                <h6 className="text-xs text-gray-600">a.n Aam Hermansyah</h6>
              </div>
            </div>
            <Button size="sm" variant="primary" className="py-1 px-2 h-auto text-[10px] border border-secondary rounded-full gap-1">
              Ganti
              <HiOutlineChevronDown />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Pencair</span>
          <span>Aam Hermansyah</span>
        </div>
        <div className="">
          <span className="font-semibold text-gray-400">Alasan Pencairan</span>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti reprehenderit dolorem molestias a repudiandae, voluptates ad eveniet, at laudantium veritatis laborum ipsam mollitia ullam impedit saepe delectus consectetur dolor, atque ratione ex velit placeat nulla. Animi ducimus atque porro, laudantium consequuntur dolor voluptatibus eius. Sequi labore voluptatibus possimus dolore laudantium.
          </p>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Pencairan</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Transaksi</span>
          <span>DANA</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">No. Rek/Tujuan</span>
          <span>082316126449</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Atas Nama</span>
          <span>Aam Hermansyah</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nominal</span>
          <span className="font-bold">Rp100.000</span>
        </div>
      </div>
    </div>
  )
}

export default WithdrawStep5