'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@/components/core/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { abbreviateName, formatIndonesianDate, formatRupiah } from "@/lib/utils"
import RowAction from "./row-action"
import { Campaign, User } from "@prisma/client"
import { useState } from "react"

type CampaignItem = Omit<Campaign, 'description'> & {
  creator?: User;
}

interface IProps {
  data: CampaignItem[];
}

function DataTable({ data }: IProps) {
  const [campaigns, setCampaigns] = useState<IProps['data']>(data);

  return (
    <Table>
      <TableHead>
        <TableHeadCol className="rounded-l-lg">Kampanye</TableHeadCol>
        <TableHeadCol>Status</TableHeadCol>
        <TableHeadCol>Kategori</TableHeadCol>
        <TableHeadCol className="text-right">Total Wakif</TableHeadCol>
        <TableHeadCol className="text-right">Target</TableHeadCol>
        <TableHeadCol>Publikasi</TableHeadCol>
        <TableHeadCol className="text-center rounded-r-lg">Aksi</TableHeadCol>
      </TableHead>
      <TableBody className="text-gray-700">
        {campaigns.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="rounded-l-lg">
              <div className="flex items-start gap-2 sm:gap-4">
                <div className="w-24 aspect-[4/3] bg-slate-300 rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt="banner campaign"
                    className="object-cover"
                  />
                </div>
                <div className="flex-auto">
                  <div className="font-bold max-w-xs">
                    {item.title}
                  </div>
                  <Separator className="my-1" />
                  <div className="flex flex-row justify-between">
                    <div>
                      <h4 className="text-xs">Terkumpul</h4>
                      <span className="block font-bold text-xs text-green-500">
                        {formatRupiah(item.collected)}
                      </span>
                    </div>
                    <div className="text-right">
                      <h4 className="text-xs">Kekurangan</h4>
                      <span className="block font-bold text-xs text-red-500">
                        {formatRupiah(item.remaining)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  item.status === 'RUNNING' ? 'info' : item.status === 'CLOSED' ? 'destructive' : 'success'
                }
                className="text-[10px] sm:text-xs"
              >
                {item.status === 'RUNNING' ? 'Berjalan' : item.status === 'CLOSED' ? 'Ditutup' : 'Selesai'}
              </Badge>
            </TableCell>
            <TableCell className="capitalize">
              {item.category}
            </TableCell>
            <TableCell className="text-right">
              {item.numberOfWakif}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {formatRupiah(item.target)}
            </TableCell>
            <TableCell>
              <span className="block">Oleh: {abbreviateName(item.creator?.name!)}</span>
              <span className="block">
                {formatIndonesianDate(item.createdAt, {
                  withoutDayName: true
                })}
              </span>
            </TableCell>
            <TableCell className="text-center rounded-r-lg">
              <RowAction />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DataTable