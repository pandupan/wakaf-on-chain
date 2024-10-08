'use client'

import SnapPayment from "@/components/shared/snap-payment";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast";
import { formatRupiah } from "@/lib/utils";
import { TransactionStatus, User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";

interface IProps {
  id: string;
  user: User;
  name: string;
  isHiddenName: boolean;
  email: string;
  message: string | null;
  amount: number;
  paymentLabel: string;
  status: TransactionStatus;
  snapToken: string | null;
  snapRedirectUrl: string | null;
}

function DetailOrder({
  id,
  user,
  email,
  message,
  name,
  amount,
  paymentLabel,
  status,
  isHiddenName,
  snapRedirectUrl,
  snapToken
}: IProps) {
  const [cancelDisplay, setCancelDisplay] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [paying, setPaying] = useState(false);
  const router = useRouter();

  const { handleAxiosErrorToast } = useAxiosErrorToast();

  const handleCancelTransaction = async () => {
    setCanceling(true);

    axios.post(`/api/user/transaction/${id}/failed`)
      .then(() => {
        router.refresh();
      })
      .catch((error: AxiosError) => {
        setCanceling(false);
        if (error.response) {
          handleAxiosErrorToast(error.response.status);
        } else {
          toast.error('Internal Error');
        }
      });
  };

  const handlePay = () => {
    // setPaying(true);

    // return new Promise((resolve, reject) => {
    //   axios.post(`/api/user/transaction/${id}/completed`)
    //     .then(() => {
    //       setTimeout(() => {
    //         router.refresh();
    //       }, 2000);
    //       resolve('Anda berhasil melakukan serah terima!');
    //     })
    //     .catch((error) => {
    //       setPaying(false);
    //       reject(error);
    //     });
    // });
    if (!snapRedirectUrl || !snapToken) {
      toast.error('Terjadi kesalahan ketika melakukan pembayaran');
    } else {
      setPaying(true);
    }
  };

  return (
    <>
      <SnapPayment
        open={paying}
        onOpenChange={setPaying}
        snapToken={snapToken!}
      />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nama Lengkap</span>
          <span className="text-right">
            {isHiddenName ? `${name} (anonim)` : name}
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
          <span className="font-bold text-right">{user.name}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Transaksi</span>
          <span className="text-right">{paymentLabel}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nominal</span>
          <span className="font-bold text-right">{formatRupiah(amount)}</span>
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
      <div className="flex min-w-full justify-between gap-4 items-center">
        {status !== 'PENDING' && (
          <Link href="/dashboard/campaign" className="w-full block">
            <Button variant="secondary" className="w-full">
              Berwakaf lagi
            </Button>
          </Link>
        )}
        {status === 'PENDING' && (
          <div className="w-full flex justify-between gap-2">
            <AlertDialog open={cancelDisplay} onOpenChange={setCancelDisplay}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full gap-2"
                  disabled={canceling || paying}
                >
                  Batalkan
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Aksi ini akan membatalkan transaksi serah terima wakaf yang telah anda lakukan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={canceling}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    onClick={handleCancelTransaction}
                    variant="destructive"
                    className="gap-2"
                    disabled={canceling}
                  >
                    {canceling && <VscLoading className="animate-spin" />}
                    Konfirmasi
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="secondary"
              className="w-full gap-2"
              disabled={canceling}
              onClick={handlePay}
            >
              Bayar
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailOrder;
