import { cn } from '@/lib/utils';
import React from 'react'

interface IProps {
  className?: string;
}

function HowToWakaf({ className }: IProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h2 className="font-extrabold tracking-wide">Cara berwakaf</h2>
      <ol className="text-sm list-decimal space-y-1 pl-4">
        <li>
          Masukkan jumlah uang yang ingin Anda wakafkan.
        </li>
        <li>
          Pilih metode pembayaran yang tersedia.
        </li>
        <li>
          Lengkapi form dengan data diri.
        </li>
        <li>
          Pastikan data sudah benar dan klik tombol serah terima.
        </li>
        <li>
          Ikuti instruksi serah terima wakaf sesuai dengan metode pembayaran yang dipilih.
        </li>
        <li>
          Setelah melakukan serah terima, admin akan melakukan konfirmasi serah terima wakaf.
        </li>
        <li>
          Anda akan menerima sertifikat dan wakaf Anda telah tersalurkan.
        </li>
      </ol>
    </div>
  )
}

export default HowToWakaf