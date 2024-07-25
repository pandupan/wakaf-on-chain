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
import { CampaignStatus } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";

interface IProps {
  status: CampaignStatus | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  campaignId: number | null;
  onSuccessAction: () => void;
}

export function NonactiveCampaignAlert({
  onOpenChange,
  open,
  onCancel,
  campaignId,
  onSuccessAction,
  status
}: IProps) {
  const [loading, setLoading] = useState(false)
  const { handleAxiosErrorToast } = useAxiosErrorToast()

  const handleNonactiveCampaign = () => {
    if (campaignId) {
      setLoading(true);
      axios
        .patch(`/api/admin/campaign/${campaignId}/status`, {
          status: status === 'RUNNING' ? 'CLOSED' : status === 'CLOSED' ? 'RUNNING' : undefined
        })
        .then(() => {
          toast.success('Kampanye berhasil di nonaktifkan sementara');
          onOpenChange(false);
          onSuccessAction();
          onCancel();
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          if (error.response) {
            handleAxiosErrorToast(error.response!.status);
          } else {
            toast.error('Internal Error');
          }
        })
        .finally(() => setLoading(false));
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
            {status === 'RUNNING' && 'Aksi ini akan menonaktifkan kampanye sementara dan user tidak akan bisa berwakaf. Jangan khawatir, anda bisa mengaktifkannya kembali kapanpun!'}
            {status === 'CLOSED' && 'Aksi ini akan mengaktifkan kembali kampanye yang sementara dinonaktifkan.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button
            variant="secondary"
            onClick={handleNonactiveCampaign}
            disabled={loading}
            className="gap-2"
          >
            {loading && <VscLoading className="animate-spin" />}
            {status === 'RUNNING' ? 'Nonaktifkan' : 'Aktifkan'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
