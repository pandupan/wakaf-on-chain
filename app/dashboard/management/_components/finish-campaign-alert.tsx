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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  campaignId: number | null;
  onSuccessAction: () => void;
}

export function FinishCampaignAlert({
  onOpenChange,
  open,
  onCancel,
  campaignId,
  onSuccessAction
}: IProps) {
  const [loading, setLoading] = useState(false)
  const { handleAxiosErrorToast } = useAxiosErrorToast()

  const handleNonactiveCampaign = () => {
    if (campaignId) {
      setLoading(true);
      axios
        .patch(`/api/admin/campaign/${campaignId}/status`, {
          status: 'REACHED'
        })
        .then(() => {
          toast.success('Kampanye berhasil ditutup dan dianggap sudah mencapai target');
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
            Aksi ini akan menyelesaikan kegiatan berwakaf pada kampanye dan dianggap bahwa sudah mencapai target yang diinginkan.
            <b> Hati hati aksi ini tidak akan bisa dikembalikan!</b>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button
            variant="success"
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
