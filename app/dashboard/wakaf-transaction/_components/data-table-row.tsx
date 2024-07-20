import { TableCell } from '@/components/core/table'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import RowAction from './row-action'
import { TransactionType } from './data-table'
import { abbreviateName, formatIndonesianDate, formatRupiah } from '@/lib/utils'

interface IProps {
  data: TransactionType;
  onClickMessage: (message: string | null) => void;
}

function DataTableRow({ data, onClickMessage }: IProps) {
  return (
    <>
      <TableCell className="rounded-l-lg">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-9 md:w-12 aspect-square bg-slate-300 rounded-full overflow-hidden">
            <img
              src={data.user?.image!}
              alt="user profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden md:block whitespace-nowrap">{data.user?.name}</span>
          <span className="block md:hidden whitespace-nowrap">{abbreviateName(data.user?.name || '')}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        {formatRupiah(data.amount)}
      </TableCell>
      <TableCell>
        <Badge
          variant={
            data.status === 'PENDING' ? 'info' : data.status === 'FAILED' ? 'destructive' : 'success'
          }
          className="text-[10px] sm:text-xs"
        >
          {data.status === 'PENDING' ? 'Pending' : data.status === 'FAILED' ? 'Dibatalkan' : 'Berhasil'}
        </Badge>
      </TableCell>
      <TableCell>
        {data.campaign?.title}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-[10px] sm:text-xs">Belum</Badge>
      </TableCell>
      <TableCell>
        {formatIndonesianDate(new Date(data.createdAt), {
          withoutDayName: true
        })}
      </TableCell>
      <TableCell className="text-center rounded-r-lg">
        <RowAction
          onClickMessage={() => {
            onClickMessage(data.message);
          }}
        />
      </TableCell>
    </>
  )
}

export default DataTableRow