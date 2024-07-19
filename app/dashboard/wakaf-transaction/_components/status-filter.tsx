import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function StatusFilter() {
  return (
    <Select>
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