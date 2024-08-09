import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { WithdrawalStatus } from "@prisma/client";

interface IProps {
  onValueChange: (value: WithdrawalStatus | 'all') => void;
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
          <SelectItem value="APPROVED">Disetujui</SelectItem>
          <SelectItem value="REJECTED">Ditolak</SelectItem>
          <SelectItem value="all">Semua</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default StatusFilter