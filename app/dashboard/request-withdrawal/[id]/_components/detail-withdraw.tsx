import { Separator } from "@/components/ui/separator";
import { formatRupiah } from "@/lib/utils";
import { User, WithdrawalRequest } from "@prisma/client";

interface IProps {
  paymentData: Pick<WithdrawalRequest, 'methodAccountHolder' | 'methodAccountNumber' | 'methodBankName'>;
  user: Pick<User, 'id' | 'name' | 'email'>;
  amount: number;
  description: string | null;
}

function DetailWithdraw({ amount, description, paymentData, user }: IProps) {

  return (
    <>
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nama Lengkap</span>
          <span className="text-right">{user.name}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Email</span>
          <span className="text-right">{user.email}</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Penarikan</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Penarikan</span>
          <span className="text-right">{paymentData.methodBankName}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Atas Nama</span>
          <span className="text-right">{paymentData.methodAccountHolder}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">No. Rek/Telepon</span>
          <span className="text-right">{paymentData.methodAccountNumber}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Jumlah</span>
          <span className="font-bold text-right">{formatRupiah(amount)}</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Deskripsi</h1>
        <p>{description || 'Deskripsi tidak diisi.'}</p>
      </div>
    </>
  );
}

export default DetailWithdraw;
