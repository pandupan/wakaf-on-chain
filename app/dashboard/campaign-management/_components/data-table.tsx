'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@/components/core/table"
import { Campaign, User } from "@prisma/client"
import { useCallback, useRef, useState } from "react"
import DataTableRow from "./data-table-row"
import { VscLoading } from "react-icons/vsc"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast"

export type CampaignItem = Omit<Campaign, 'description'> & {
  creator?: User;
}

interface IProps {
  data: CampaignItem[];
  limit: number;
}

function DataTable({ data, limit }: IProps) {
  const [campaigns, setCampaigns] = useState<IProps['data']>(data)
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null)
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)

  const { handleAxiosErrorToast } = useAxiosErrorToast()
  const observer = useRef<IntersectionObserver | null>()

  const lastDataElementRef = useCallback((node: HTMLTableRowElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setLoading(true);
        axios.get(`/api/admin/campaign?cursor=${cursor}&limit=${limit}`)
          .then((res) => {
            if (res.data.length === limit) {
              setCursor(data[data.length - 1].id);
            } else {
              setHasMore(false);
            }
            setCampaigns((prev) => [...prev, ...res.data]);
          })
          .catch((error: AxiosError) => {
            if (error.response) {
              handleAxiosErrorToast(error.response!.status);
            } else {
              toast.error('Internal Error');
            }
          })
          .finally(() => setLoading(false));
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

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
        {campaigns
          .map((item, index) => {
            if (campaigns.length === index + 1 && hasMore) return (
              <TableRow ref={lastDataElementRef} key={item.id}>
                <DataTableRow data={item} />
              </TableRow>
            )
            return (
              <TableRow key={item.id}>
                <DataTableRow data={item} />
              </TableRow>
            )
          })}
        {loading && (
          <TableRow>
            <TableCell colSpan={7} className="bg-background hover:bg-background">
              <VscLoading fontSize={20} className="animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        )}
        {!hasMore && (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-gray-500 bg-background hover:bg-background">
              Tidak ada lagi kampanye
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DataTable