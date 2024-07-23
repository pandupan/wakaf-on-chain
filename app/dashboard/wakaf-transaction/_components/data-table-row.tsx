import { TableCell } from '@/components/core/table'
import { Badge } from '@/components/ui/badge'
import React, { useState } from 'react'
import RowAction from './row-action'
import { TransactionType } from './data-table'
import { abbreviateName, cn, formatIndonesianDate, formatRupiah } from '@/lib/utils'
import axios from 'axios'
import { toast } from 'sonner'

interface IProps {
  data: TransactionType;
  onClickMessage: (message: string | null) => void;
  onSuccessVerify: (transactionId: string) => void;
}

function DataTableRow({ data, onClickMessage, onSuccessVerify }: IProps) {
  const [verifying, setVerifying] = useState(false)

  const handleClickVerifyTransaction = () => {
    setVerifying(true);
    const promise = axios.post(`/api/user/transaction/${data.id}/verify`, {
      campaignId: data.campaignId,
      userId: data.userId,
    })

    toast.promise(promise, {
      loading: 'Sedang memverifikasi transaksi...',
      success: () => {
        onSuccessVerify(data.id);
        return 'Transaksi berhasil diverifikasi!';
      },
      error: 'Transaksi gagal diverifikasi!.',
      finally: () => setVerifying(false),
    })
  }

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
        <Badge
          variant="outline"
          className={cn(
            'text-[10px] sm:text-xs',
            data.statementVerified ? 'text-emerald-500 border-emerald-500' : ''
          )}
        >
          {data.statementVerified ? 'Sudah' : 'Belum'}
        </Badge>
      </TableCell>
      <TableCell>
        {formatIndonesianDate(new Date(data.createdAt), {
          withoutDayName: true
        })}
      </TableCell>
      <TableCell className="text-center rounded-r-lg">
        <RowAction
          isVerified={data.statementVerified}
          verifying={verifying}
          disabled={data.status !== 'COMPLETED'}
          onClickVerifyTransaction={handleClickVerifyTransaction}
          onClickMessage={() => {
            onClickMessage(data.message);
          }}
        />
      </TableCell>
    </>
  )
}

export default DataTableRow