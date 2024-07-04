import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@/components/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { abbreviateName } from "@/lib/utils"
import RowAction from "./row-action"

function DataTable() {
  return (
    <Table>
      <TableHead>
        <TableHeadCol className="rounded-l-lg">Kampanye</TableHeadCol>
        <TableHeadCol>Status</TableHeadCol>
        <TableHeadCol className="text-right">Donatur</TableHeadCol>
        <TableHeadCol className="text-right">Target</TableHeadCol>
        <TableHeadCol>Dibuat</TableHeadCol>
        <TableHeadCol className="text-center rounded-r-lg">Aksi</TableHeadCol>
      </TableHead>
      <TableBody className="text-gray-700">
        <TableRow>
          <TableCell className="rounded-l-lg">
            <div className="flex items-start gap-2 sm:gap-4">
              <div className="w-24 aspect-[4/3] bg-slate-300 rounded-md overflow-hidden">
                {/* <img
                  src="https://picsum.photos/id/83/1600/900"
                  alt="Campaign"
                  className="object-cover"
                /> */}
              </div>
              <div className="flex-auto">
                <div className="font-bold max-w-xs">
                  Mari berwakaf untuk membantu santri PPM Al Ihsan Tasikmalaya
                </div>
                <Separator className="my-1" />
                <div className="flex flex-row justify-between">
                  <div>
                    <h4 className="text-xs">Terkumpul</h4>
                    <span className="block font-bold text-xs text-green-500">
                      Rp9.835.000
                    </span>
                  </div>
                  <div className="text-right">
                    <h4 className="text-xs">Kekurangan</h4>
                    <span className="block font-bold text-xs text-red-500">
                      Rp805.000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge variant="success" className="text-[10px] sm:text-sm">Berjalan</Badge>
          </TableCell>
          <TableCell className="text-right">
            20
          </TableCell>
          <TableCell className="text-right">
            Rp12.000.000
          </TableCell>
          <TableCell>
            {abbreviateName('Aam Hermansyah')}
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