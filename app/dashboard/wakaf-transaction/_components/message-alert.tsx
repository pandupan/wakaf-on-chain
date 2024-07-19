import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  message: string | null;
}

function MessageAlert({ message, onCancel, onOpenChange, open }: IProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onCancel();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pesan atau Doa</DialogTitle>
          <DialogDescription className="italic">
            {`"${message || 'Pesan atau doa tidak diisi.'}"`}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default MessageAlert