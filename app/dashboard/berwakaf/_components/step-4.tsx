import { Button } from '@/components/ui/button'
import { HiOutlineChevronDown } from 'react-icons/hi'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Separator } from '@/components/ui/separator'

function Step4() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">3</span>
        <h1 className="text-lg font-bold">Ringkasan</h1>
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
          <div className="flex items-center justify-between gap-2 p-2 shadow-sm text-sm">
            <div className="flex items-center gap-2">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
              DANA
            </div>
            <Button size="sm" variant="primary" className="py-1.5 h-auto text-xs border border-secondary rounded-full gap-2">
              Ganti
              <HiOutlineChevronDown />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nama Lengkap</span>
          <span>Aam Hermansyah (anonim)</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Email/Nomor Ponsel</span>
          <span>aamhermansyah@gmail.com</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Wakaf</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Atas Nama</span>
          <span className="font-bold">Aam Hermansyah</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Transaksi</span>
          <span>DANA</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nominal</span>
          <span className="font-bold">Rp100.000</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-1">
        <p className="text-xs">
          <b><sup>*</sup>Catatan:</b> Kamu akan mendapatkan <b>sertifikat</b> wakaf setelah berhasil melakukan wakaf.
        </p>
        <p className="text-xs">
          <b><sup>*</sup>Penting:</b> Terdapat <b>biaya admin</b> pada saat transaksi berlangsung karena adanya <b>pihak ketiga</b> untuk melakukan transaksi.
        </p>
      </div>
    </div>
  )
}

export default Step4