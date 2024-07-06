import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow
} from '@/components/core/table'
import { Badge } from '@/components/ui/badge'
import { abbreviateName } from '@/lib/utils'

function HistoryWithdraw() {
  return (
    <div className="bg-background p-4 rounded-xl shadow-sm space-y-2">
      <h2 className="text-lg font-bold text-secondary">Riwayat Pencairan</h2>
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Jumlah</TableHeadCol>
          <TableHeadCol>Status</TableHeadCol>
          <TableHeadCol className="min-w-[150px]">Kampanye</TableHeadCol>
          <TableHeadCol>Pencair</TableHeadCol>
          <TableHeadCol>Tanggal</TableHeadCol>
          <TableHeadCol className="rounded-r-lg">Metode</TableHeadCol>
        </TableHead>
        <TableBody className="text-gray-700">
          <TableRow isEven={false}>
            <TableCell className="rounded-l-lg">
              Rp2.500.000
            </TableCell>
            <TableCell>
              <Badge variant="success" className="text-[10px] sm:text-xs">Sukses</Badge>
            </TableCell>
            <TableCell>
              Kebutuhan untuk perbaikan mesjid al ihsan tasikmalaya 2024
            </TableCell>
            <TableCell>
              {abbreviateName('Aam Hermansyah')}
            </TableCell>
            <TableCell>
              20:33, 7 Juli 2024
            </TableCell>
            <TableCell className="rounded-r-lg">
              DANA
            </TableCell>
          </TableRow>
          <TableRow isEven={true}>
            <TableCell className="rounded-l-lg">
              Rp2.500.000
            </TableCell>
            <TableCell>
              <Badge variant="info" className="text-[10px] sm:text-xs">Pending</Badge>
            </TableCell>
            <TableCell>
              Kebutuhan untuk perbaikan mesjid al ihsan tasikmalaya 2024
            </TableCell>
            <TableCell>
              {abbreviateName('Ega Aprianto')}
            </TableCell>
            <TableCell>
              20:33, 7 Juli 2024
            </TableCell>
            <TableCell className="rounded-r-lg">
              DANA
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default HistoryWithdraw