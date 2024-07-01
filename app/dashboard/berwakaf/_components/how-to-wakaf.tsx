import { cn } from '@/lib/utils';
import React from 'react'

interface IProps {
  className?: string;
}

function HowToWakaf({ className }: IProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h2 className="font-extrabold tracking-wide">Cara berwakaf</h2>
      <ol className="text-sm list-decimal space-y-2 pl-4">
        <li>
          Masukkan jumlah uang yang ingin Anda wakafkan.
        </li>
        <li>
          Lengkapi form dengan data diri Anda, seperti nama, alamat email, dan nomor telepon.
        </li>
        <li>
          Pilih metode pembayaran yang tersedia melalui Midtrans, seperti transfer bank, kartu kredit, atau e-wallet.
        </li>
        <li>
          Ikuti instruksi pembayaran yang diberikan oleh Midtrans sesuai dengan metode pembayaran yang dipilih.
        </li>
        <li>
          Setelah melakukan pembayaran, konfirmasi transaksi melalui halaman konfirmasi atau tunggu notifikasi dari Midtrans.
        </li>
        <li>
          Anda akan menerima notifikasi dan terima kasih dari kami setelah pembayaran berhasil. Wakaf Anda telah tersalurkan.
        </li>
      </ol>
    </div>
  )
}

export default HowToWakaf