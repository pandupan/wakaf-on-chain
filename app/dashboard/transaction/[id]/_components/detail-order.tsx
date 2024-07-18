import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatRupiah } from "@/lib/utils";
import { TransactionStatus, User } from "@prisma/client";
import React from "react"

interface IProps {
  user: User;
  name: string | null;
  email: string;
  message: string | null;
  amount: number;
  paymentLabel: string;
  status: TransactionStatus;
}

function DetailOrder({ user, email, message, name, amount, paymentLabel, status }: IProps) {
  return (
    <>
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nama Lengkap</span>
          <span className="text-right">
            {!name ? `${user.name} (anonim)` : name}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Email/Nomor Ponsel</span>
          <span className="text-right">{email}</span>
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
            {paymentLabel}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nominal</span>
          <span className="font-bold text-right">
            {formatRupiah(amount)}
          </span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Pesan atau Doa</h1>
        <div className="p-4 border rounded-md">
          <p className="text-gray-400 italic">
            {`"${message || 'Pesan atau doa tidak diisi.'}"`}
          </p>
        </div>
      </div>
      {status === 'COMPLETED' && (
        <Button variant="secondary" className="w-full">
          Donasi lagi
        </Button>
      )}
      {status === 'PENDING' && (
        <Button variant="secondary" className="w-full">
          Bayar
        </Button>
      )}
    </>
  );
};

export default DetailOrder;
