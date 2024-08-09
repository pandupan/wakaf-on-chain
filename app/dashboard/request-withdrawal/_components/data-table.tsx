'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@/components/core/table";
import InputSearch from "@/components/shared/input-search";
import React, { useCallback, useRef, useState } from "react";
import StatusFilter from "./status-filter";
import { Campaign, User, WithdrawalRequest, WithdrawalStatus } from "@prisma/client";
import axios, { AxiosError, CancelTokenSource } from "axios";
import DataTableRow from "./data-table-row";
import { VscLoading } from "react-icons/vsc";
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast";
import { toast } from "sonner";

export type WithdrawalType = (WithdrawalRequest & {
  user?: Pick<User, 'id' | 'name'>;
  campaign?: Pick<Campaign, 'id' | 'title'>;
})

interface IProps {
  data: WithdrawalType[];
  limit: number;
  hiddenFilterAndSearch?: boolean;
  title?: string;
}

const DataTable: React.FC<IProps> = ({ data, limit, hiddenFilterAndSearch, title }) => {
  const [withdrawalRequest, setWithdrawalRequest] = useState(data);
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null)
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<WithdrawalStatus | 'all'>('all');
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
      fetch(value, 'reset', category === 'all' ? undefined : category);
    }
  }

  const handleStatusFilter = (value: WithdrawalStatus | 'all') => {
    setCategory(value);
    fetch(search, 'reset', value === 'all' ? undefined : value);
  }

  const fetch = useCallback((
    keyword: string,
    type: 'reset' | 'pagination',
    status?: WithdrawalStatus
  ) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    if (type === 'pagination') setLoading(true);
    else {
      setSearching(true);
      setHasMore(true);
    };

    axios
      .get(`/api/admin/withdraw`, {
        params: type === 'reset' ? {
          search: keyword,
          limit,
          category: status
        } : {
          cursor,
          limit: limit,
          search: keyword,
          category: status
        },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length === limit) {
          setCursor(res.data[res.data.length - 1].id);
        } else {
          setHasMore(false);
        }
        setWithdrawalRequest((prev) => type === 'reset' ? [...res.data] : [...prev, ...res.data]);
      })
      .catch((error: AxiosError) => {
        setWithdrawalRequest([]);
        setHasMore(false);
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
        fetch(search, 'pagination', category === 'all' ? undefined : category)
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <>
      {!hiddenFilterAndSearch && (
        <div className="w-full flex items-end gap-2">
          <div className="w-full max-w-sm">
            <InputSearch
              placeholder="Cari transaksi: nama wakif, judul kampanye"
              onChange={handleSearch}
            />
          </div>
          <StatusFilter
            onValueChange={handleStatusFilter}
            disabled={searching || loading}
          />
        </div>
      )}
      <div className="p-4 rounded-lg bg-background mt-4">
        {title && (
          <h2 className="text-lg font-bold text-secondary">{title}</h2>
        )}
        <Table>
          <TableHead>
            <TableHeadCol className="rounded-l-lg">Kampanye</TableHeadCol>
            <TableHeadCol>Status</TableHeadCol>
            <TableHeadCol>Jumlah</TableHeadCol>
            <TableHeadCol className="text-left">Admin</TableHeadCol>
            <TableHeadCol>Tanggal</TableHeadCol>
            <TableHeadCol>Metode</TableHeadCol>
            <TableHeadCol className="text-center rounded-r-lg">Aksi</TableHeadCol>
          </TableHead>
          <TableBody>
            {!searching && withdrawalRequest
              .map((item, index) => {
                if (withdrawalRequest.length === index + 1 && hasMore) return (
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
                  Tidak ada lagi transaksi
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DataTable;
