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
import axios, { AxiosError, CancelTokenSource } from "axios"
import { toast } from "sonner"
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast"
import InputSearch from "@/components/shared/input-search"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const { handleAxiosErrorToast } = useAxiosErrorToast()
  const observer = useRef<IntersectionObserver | null>()

  const handleSearch = (value: string) => {
    // Hapus spasi di awal dan di akhir
    value = value.trim();
    // Jika pencarian sebelumnya tidak sama dengan pencarian sekarang
    // Maka, lanjutkan pencarian
    if (search !== value) {
      setSearch(value);
      fetch(value, 'reset');
    }
  }

  const fetch = useCallback((keyword: string, type: 'reset' | 'pagination') => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    if (type === 'pagination') setLoading(true);
    else setSearching(true);

    axios
      .get(`/api/admin/campaign`, {
        params: type === 'reset' ? { search: keyword } : { cursor, limit: limit, search: keyword },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length === limit) {
          setCursor(res.data[res.data.length - 1].id);
          if (!hasMore) setHasMore(true);
        } else {
          setHasMore(false);
        }
        setCampaigns((prev) => type === 'reset' ? [...res.data] : [...prev, ...res.data]);
      })
      .catch((error: AxiosError) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            handleAxiosErrorToast(axiosError.response.status);
          } else {
            toast.error('Internal Error');
          }
        }
      })
      .finally(() => {
        if (type === 'pagination') setLoading(false);
        else setSearching(false);
      });
  }, [cursor]);

  const lastDataElementRef = useCallback((node: HTMLTableRowElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetch(search, 'pagination')
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <>
      <div className="max-w-sm">
        <InputSearch
          placeholder="Cari kampanye: judul, kategori"
          onChange={handleSearch}
        />
      </div>
      <div className="p-4 rounded-lg bg-background mt-4">
        <div className="mb-2 w-full flex justify-between items-end">
          <h2 className="sm:text-lg font-semibold">Daftar Kampanye</h2>
          <Link href="/dashboard/campaign/create">
            <Button variant="secondary" size="sm" className="text-[10px] sm:text-xs rounded-lg">
              Tambah Kampanye
            </Button>
          </Link>
        </div>
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
            {!searching && campaigns
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
            {(searching || loading) && (
              <TableRow>
                <TableCell colSpan={7} className="bg-background hover:bg-background">
                  <VscLoading fontSize={20} className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            )}
            {!searching && !hasMore && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 bg-background hover:bg-background">
                  Tidak ada lagi kampanye
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default DataTable