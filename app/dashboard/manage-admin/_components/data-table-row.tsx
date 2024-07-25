import { TableCell } from '@/components/core/table'
import React from 'react'
import RowAction from './row-action'
import { AdminListType } from './data-table';
import { formatIndonesianDate } from '@/lib/utils';
import { ADMIN_EMAIL } from '@/lib/constants';

interface IProps {
  data: AdminListType;
  onClickDelete: (adminId: string) => void;
}

function DataTableRow({ data, onClickDelete }: IProps) {
  return (
    <>
      <TableCell className="rounded-l-lg items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gray-300 rounded-full w-10 sm:w-14 aspect-square overflow-hidden">
            <img
              src={data.image!}
              alt="admin image"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="w-full">{data.name}</p>
            <span className="text-[10px] font-bold text-secondary whitespace-nowrap">
              {data.role.replace('_', ' ')}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>{formatIndonesianDate(new Date(data.adminRecruitedAt!))}</TableCell>
      <TableCell className="text-center">9x</TableCell>
      <TableCell>Rp. 9.000.000</TableCell>
      <TableCell className="text-center rounded-r-lg">
        <RowAction
          disabled={data.email === ADMIN_EMAIL}
          onClickDelete={() => {
            onClickDelete(data.id)
          }}
        />
      </TableCell>
    </>
  )
}

export default DataTableRow