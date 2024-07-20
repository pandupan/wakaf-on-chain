import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TransactionStatus } from "@prisma/client";

interface IProps {
  onValueChange: (value: TransactionStatus | 'all') => void;
  disabled?: boolean;
}

function StatusFilter({ onValueChange, disabled }: IProps) {
  return (
    <Select onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[100px] rounded-full border-0 shadow-sm py-2 h-auto">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Daftar Status</SelectLabel>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="COMPLETED">Berhasil</SelectItem>
          <SelectItem value="FAILED">Gagal</SelectItem>
          <SelectItem value="all">Semua</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default StatusFilter