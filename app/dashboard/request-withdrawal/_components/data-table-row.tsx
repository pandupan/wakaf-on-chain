import { TableCell } from "@/components/core/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaEllipsis } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { WithdrawalType } from "./data-table";
import { abbreviateName, formatIndonesianDate, formatRupiah } from "@/lib/utils";

interface IProps {
  data: WithdrawalType;
}

function DataTableRow({ data }: IProps) {
  return (
    <>
      <TableCell className="rounded-l-lg min-w-[150px]">
        {data.campaign?.title}
      </TableCell>
      <TableCell>
        <Badge
          variant={
            data.status === 'PENDING' ? 'info' : data.status === 'REJECTED' ? 'destructive' : 'success'
          }
          className="text-[10px] sm:text-xs"
        >
          {data.status === 'PENDING' ? 'Pending' : data.status === 'REJECTED' ? 'Ditolak' : 'Disetujui'}
        </Badge>
      </TableCell>
      <TableCell>
        {formatRupiah(data.amount)}
      </TableCell>
      <TableCell>{abbreviateName(data.user?.name || '', 2)}</TableCell>
      <TableCell>{formatIndonesianDate(new Date(data.createdAt))}</TableCell>
      <TableCell>{data.methodBankName}</TableCell>
      <TableCell className="rounded-r-lg">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="data-[state=open]:bg-muted text-xs"
            >
              <FaEllipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[200px] space-y-1"
          >
            <DropdownMenuItem>
              <Link
                className="w-full flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
                href={`/dashboard/request-withdrawal/${data.id}`}
              >
                <FiEye /> Detail
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </>
  )
}

export default DataTableRow