import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@/components/table"
import { Badge } from "@/components/ui/badge"
import RowAction from "./row-action"

function DataTable() {
  return (
    <Table>
      <TableHead>
        <TableHeadCol className="rounded-l-lg">Wakif</TableHeadCol>
        <TableHeadCol className="text-right">Jumlah Wakaf</TableHeadCol>
        <TableHeadCol>Status</TableHeadCol>
        <TableHeadCol className="min-w-[150px]">Kampanye Tujuan</TableHeadCol>
        <TableHeadCol>Status Sertifikat</TableHeadCol>
        <TableHeadCol className="text-center rounded-r-lg">Aksi</TableHeadCol>
      </TableHead>
      <TableBody className="text-gray-700">
        <TableRow>
          <TableCell className="rounded-l-lg">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-12 aspect-square bg-slate-300 rounded-full overflow-hidden">
                {/* <img
                  src="https://picsum.photos/id/83/1600/900"
                  alt="Campaign"
                  className="object-cover"
                /> */}
              </div>
              Aam Hermansyah
            </div>
          </TableCell>
          <TableCell className="text-right">
            Rp200.000
          </TableCell>
          <TableCell>
            <Badge variant="success" className="text-[10px] sm:text-sm">Berhasil</Badge>
          </TableCell>
          <TableCell>
            Mari berwakaf untuk membantu santri PPM Al Ihsan Tasikmalaya
          </TableCell>
          <TableCell>
            <Badge variant="info" className="text-[10px] sm:text-sm">Belum</Badge>
          </TableCell>
          <TableCell className="text-center rounded-r-lg">
            <RowAction />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default DataTable