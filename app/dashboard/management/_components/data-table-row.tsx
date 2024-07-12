import {
  TableCell,
} from "@/components/core/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { abbreviateName, formatIndonesianDate, formatRupiah, numberPrefixer } from "@/lib/utils"
import RowAction from "./row-action"
import { CampaignItem } from "./data-table"

interface IProps {
  data: CampaignItem;
  onClickNonactive: (id: number) => void;
  onClickFinishCampaign: (id: number) => void;
}

function DataTableRow({ data, onClickFinishCampaign, onClickNonactive }: IProps) {
  return (
    <>
      <TableCell className="rounded-l-lg">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="w-24 aspect-[4/3] bg-slate-300 rounded-md overflow-hidden">
            <img
              src={data.image}
              alt="banner campaign"
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <div className="font-bold max-w-xs">
              {data.title}
            </div>
            <Separator className="my-1" />
            <div className="flex flex-row justify-between">
              <div>
                <h4 className="text-xs">Terkumpul</h4>
                <span className="block font-bold text-xs text-green-500">
                  {formatRupiah(data.collected)}
                </span>
              </div>
              <div className="text-right">
                <h4 className="text-xs">Kekurangan</h4>
                <span className="block font-bold text-xs text-red-500">
                  {formatRupiah(data.remaining)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            data.status === 'RUNNING' ? 'info' : data.status === 'CLOSED' ? 'destructive' : 'success'
          }
          className="text-[10px] sm:text-xs"
        >
          {data.status === 'RUNNING' ? 'Berjalan' : data.status === 'CLOSED' ? 'Ditutup' : 'Selesai'}
        </Badge>
      </TableCell>
      <TableCell className="capitalize">
        {data.category}
      </TableCell>
      <TableCell className="text-right">
        {data.numberOfWakif}
      </TableCell>
      <TableCell className="text-right font-semibold">
        <span className="md:hidden">{numberPrefixer(data.target)}</span>
        <span className="hidden md:inline">{formatRupiah(data.target)}</span>
      </TableCell>
      <TableCell>
        <span className="block">Oleh: {abbreviateName(data.creator?.name!)}</span>
        <span className="block">
          {formatIndonesianDate(new Date(data.createdAt), {
            withoutDayName: true
          })}
        </span>
      </TableCell>
      <TableCell className="text-center rounded-r-lg">
        <RowAction
          data={data}
          onClickFinishCampaign={onClickFinishCampaign}
          onClickNonactive={onClickNonactive}
        />
      </TableCell>
    </>
  )
}

export default DataTableRow