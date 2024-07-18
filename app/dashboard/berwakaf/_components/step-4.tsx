import { Button } from '@/components/ui/button'
import { HiOutlineChevronDown } from 'react-icons/hi'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Separator } from '@/components/ui/separator'
import { forwardRef } from 'react'
import { FormTypes } from '../_types'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { formatRupiah } from '@/lib/utils'

interface IProps {
  data: FormTypes;
  user: Session['user'];
  onChangeStep: (step: number) => void;
}

const Step4 = forwardRef<HTMLDivElement, IProps>(({ data, user, onChangeStep }, ref) => {
  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">4</span>
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
              {data.step2.paymentMethodLabel}
            </div>
            <Button
              size="sm"
              variant="primary"
              className="py-1 px-2 h-auto text-[10px] border border-secondary rounded-full gap-1"
              onClick={() => onChangeStep(2)}
            >
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
          <span className="text-right">
            {data.step3.name} {data.step3.isHiddenName && '(anonim)'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Email/Nomor Ponsel</span>
          <span className="text-right">{data.step3.email}</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Wakaf</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Atas Nama</span>
          <span className="font-bold text-right">
            {user.name}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Transaksi</span>
          <span className="text-right">
            {data.step2.paymentMethodLabel}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nominal</span>
          <span className="font-bold text-right">
            {formatRupiah(data.step1.amount)}
          </span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Pesan atau Doa</h1>
        <div className="p-4 border rounded-md">
          <p className="text-gray-400 italic">
            {`"${data.step3.message || 'Anda tidak memasukan pesan atau doa apapun.'}"`}
          </p>
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
})

export default Step4