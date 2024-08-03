import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow
} from '@/components/core/table'
import { WithdrawalAccountItem } from './layout-account';
import { Button } from '@/components/ui/button';
import { IoMdTrash } from 'react-icons/io';
import { abbreviateName, formatIndonesianDate } from '@/lib/utils';

interface IProps {
  data: WithdrawalAccountItem[];
  onClickDelete: (id: string) => void;
}

function DataTable({ data, onClickDelete }: IProps) {
  return (
    <>
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Bank/Wallet</TableHeadCol>
          <TableHeadCol>Atas Nama</TableHeadCol>
          <TableHeadCol>Dibuat</TableHeadCol>
          <TableHeadCol>Tanggal</TableHeadCol>
          <TableHeadCol className="rounded-r-lg">Aksi</TableHeadCol>
        </TableHead>
        <TableBody className="text-gray-700">
          {data.map((item, index) => (
            <TableRow isEven={index % 2 === 0} key={item.id}>
              <TableCell className="rounded-l-lg">
                <h4 className="text-sm md:text-base font-bold">{item.bankName}</h4>
                <span>{item.accountNumber}</span>
              </TableCell>
              <TableCell>
                {abbreviateName(item.accountHolder, 2)}
              </TableCell>
              <TableCell>
                {abbreviateName(item.user.name!, 2)}
              </TableCell>
              <TableCell>
                {formatIndonesianDate(new Date(item.createdAt), {
                  withoutDayName: true
                })}
              </TableCell>
              <TableCell className="rounded-r-lg">
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-auto p-1.5 sm:p-2 text-xs sm:text-sm"
                  onClick={() => onClickDelete(item.id)}
                >
                  <IoMdTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow className="hover:bg-background">
              <TableCell colSpan={6} align="center">
                <p className="pt-3">
                  Akun penarikan masih kosong.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length >= 10 && (
        <p className="text-xs sm:text-sm text-center text-gray-400">
          Akun penarikan sudah mencapai maksimal
        </p>
      )}
    </>
  )
}

export default DataTable