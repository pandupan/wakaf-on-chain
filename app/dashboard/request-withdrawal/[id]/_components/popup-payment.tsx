'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaCamera } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { WithdrawalRequest } from "@prisma/client";
import { MdDelete } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import axios, { AxiosError } from "axios";
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface IProps {
  paymentData: Pick<WithdrawalRequest, 'methodAccountHolder' | 'methodAccountNumber' | 'methodBankName'>
  withdrawalRequestId: string
}

function PopupPayment({ paymentData, withdrawalRequestId }: IProps) {
  const [proofUploadDisplay, setProofUploadDisplay] = useState(false);
  const [cancelWithdrawalDisplay, setCancelWithdrawalDisplay] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [rejectedNote, setRejectedNote] = useState('');

  const { handleAxiosErrorToast } = useAxiosErrorToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar.");
        setSelectedFile(null); // Reset file state
        return;
      }

      if (file.size > 2 * 1024 * 1024) { // 2MB
        setError("Ukuran file tidak boleh lebih dari 2MB.");
        setSelectedFile(null); // Reset file state
        return;
      }

      // Jika lolos validasi, hapus pesan error dan simpan file
      setError(null);
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      setLoading(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string;

        axios.post(`/api/admin/withdraw/${withdrawalRequestId}/approve`, {
          proofPayment: base64Image
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error: AxiosError) => {
            setLoading(false);
            if (error.response) {
              handleAxiosErrorToast(error.response!.status);
            } else {
              toast.error('Internal Error');
            }
          })
      };

      reader.onerror = () => {
        setLoading(false);
        setError("Gagal mengkonversi file menjadi base64.");
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setError("Anda harus mengunggah file gambar.");
    }
  };

  const handleReject = () => {
    setLoading(true);
    axios.post(`/api/admin/withdraw/${withdrawalRequestId}/reject`, {
      rejectedNote
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        if (error.response) {
          handleAxiosErrorToast(error.response!.status);
        } else {
          toast.error('Internal Error');
        }
      })
  }

  return (
    <div className="w-full flex justify-between gap-2">
      <AlertDialog open={cancelWithdrawalDisplay} onOpenChange={setCancelWithdrawalDisplay}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full" disabled={loading}>
            Tolak
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Permintaan penarikan akan ditolak dan anda tidak dapat mengembalikan aksi ini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="Masukan alasan menolak penarikan (min. 20 karakter)"
            className="h-[150px]"
            value={rejectedNote}
            onChange={(e) => setRejectedNote(e.target.value)}
          ></Textarea>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              disabled={loading}
              className="gap-2"
              onClick={() => setCancelWithdrawalDisplay(false)}
            >
              {loading && <VscLoading className="animate-spin" />}
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={loading || rejectedNote.length < 20}
              className="gap-2"
              onClick={handleReject}
            >
              {loading && <VscLoading className="animate-spin" />}
              Konfirmasi
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={proofUploadDisplay} onOpenChange={setProofUploadDisplay}>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" className="w-full" disabled={loading}>
            Transfer
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-md p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">Upload Bukti Pembayaran</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Silakan upload bukti pembayaran untuk menyelesaikan transaksi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className=" bg-gray-200 text-center rounded-lg p-4">
            <span className="block text-sm font-medium text-gray-700">
              {paymentData.methodBankName} - {paymentData.methodAccountHolder}
            </span>
            <span className="block text-blue-600 text-lg font-bold">
              {paymentData.methodAccountNumber}
            </span>
          </div>
          <div>
            <div className="relative h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100">
              {selectedFile ? (
                <>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="upload image"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-2 rounded-full border bg-white cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setSelectedFile(null)}
                    disabled={loading}
                  >
                    <MdDelete />
                  </button>
                </>
              ) : (
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaCamera className="w-12 h-12 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span> atau seret dan lepas</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                </label>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              onClick={() => setProofUploadDisplay(false)}
              variant="outline"
              disabled={loading}
              className="gap-2"
            >
              {loading && <VscLoading className="animate-spin" />}
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="secondary"
              disabled={loading}
              className="gap-2"
            >
              {loading && <VscLoading className="animate-spin" />}
              Submit
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default PopupPayment;
