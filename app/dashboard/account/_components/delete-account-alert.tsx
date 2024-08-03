import { deleteWithdrawalAccount } from "@/actions/withdrawal-account";
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
import { useState, useTransition } from "react";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  accountId: string | null;
  onDeleteSuccess: (id: string) => void;
}

export function DeleteAccountAlert({
  onOpenChange,
  open,
  onCancel,
  accountId,
  onDeleteSuccess
}: IProps) {
  const [deleting, startDeleting] = useTransition()

  const handleDeleteAccount = () => {
    if (accountId) {
      startDeleting(() => {
        deleteWithdrawalAccount(accountId).then((res) => {
          if (res.success) {
            toast.success('Akun penarikan berhasil dihapus.')
            onDeleteSuccess(accountId);
            onOpenChange(false);
          } else {
            toast.error(res.error)
          }
        })
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
            Aksi ini akan menghapus data rekening atau wallet yang telah anda buat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={deleting}
            className="gap-2"
          >
            {deleting && <VscLoading className="animate-spin" />}
            Konfirmasi
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
