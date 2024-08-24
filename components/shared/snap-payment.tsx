'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snapToken: string;
}

function SnapPayment({
  onOpenChange,
  open,
  snapToken
}: IProps) {
  useEffect(() => {
    const midtransScriptUrl = `${process.env.NEXT_PUBLIC_MIDTRANS_API_URL}/snap/snap.js`;
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement('script') as HTMLScriptElement;
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey || '');

    if (open) {
      scriptTag.onload = () => {
        // @ts-expect-error
        if (window.snap) {
          // @ts-expect-error
          window.snap.embed(snapToken, {
            embedId: 'snap-container',
            onSuccess: (res: any) => {
              toast.success('Yayy... Serah terima berhasil!');
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            },
            onPending: () => {
              onOpenChange(false);
            },
            onClose: () => {
              onOpenChange(false);
            },
            onError: () => {
              toast.error('Terjadi error pada saat pembayaran');
            }
          });
        }
      }

      document.body.appendChild(scriptTag);

      return () => {
        document.body.removeChild(scriptTag);
      }
    }

  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-0 h-[600px] overflow-y-auto" aria-describedby="payment">
        <AlertDialogTitle className="hidden">Payment</AlertDialogTitle>
        <button
          className="absolute top-2 right-2 z-10"
          onClick={() => onOpenChange(false)}
        >
          <MdClose />
        </button>
        <div className="w-full h-full flex justify-center items-center p-4 bg-background">
          <VscLoading className="animate-spin text-2xl" />
        </div>
        <div id="snap-container" className="absolute inset-0 w-full"></div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SnapPayment;