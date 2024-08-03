import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";

interface IProps {
  adminId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
}

function RemoveAdminAlert({ adminId, onCancel, onOpenChange, open }: IProps) {
  const [loading, setLoading] = useState(false)
  const { handleAxiosErrorToast } = useAxiosErrorToast()

  const handleNonactiveCampaign = () => {
    if (adminId) {
      setLoading(true);
      axios
        .delete(`/api/admin/${adminId}`)
        .then(() => {
          toast.warning('Admin berhasil dihapus!');
          setTimeout(() => {
            window.location.reload();
          }, 1000)
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
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel();
        onOpenChange(open);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan menghapus admin yang sedang beroperasi saat ini.
            Jangan khawatir pengguna dapat di jadikan admin kembali.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleNonactiveCampaign}
            disabled={loading}
            className="gap-2"
          >
            {loading && <VscLoading className="animate-spin" />}
            Konfirmasi
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveAdminAlert