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
import RowAction from "./row-action"
import { Campaign, Transaction, TransactionStatus, User } from "@prisma/client";
import { useCallback, useRef, useState } from "react";
import DataTableRow from "./data-table-row";
import InputSearch from "@/components/shared/input-search";
import axios, { AxiosError, CancelTokenSource } from "axios";
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast";
import { toast } from "sonner";
import { VscLoading } from "react-icons/vsc";
import MessageAlert from "./message-alert";
import StatusFilter from "./status-filter";

export type TransactionType = (Transaction & {
  user?: User;
  campaign?: Campaign;
})

interface IProps {
  data: TransactionType[];
  limit: number;
}

function DataTable({ data, limit }: IProps) {
  const [transactions, setTransactions] = useState(data);
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null)
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<TransactionStatus | 'all'>('all');
  const [searching, setSearching] = useState(false)
  const [messageDisplay, setMessageDisplay] = useState(false);
  const [messageWakif, setMessageWakif] = useState<string | null>(null)
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

  const handleStatusFilter = (value: TransactionStatus | 'all') => {
    setCategory(value);
    fetch(search, 'reset', value === 'all' ? undefined : value);
  }

  const handleSuccessVerify = (id: string) => {
    setTransactions((prev) => {
      const updatedTransactions = [...prev];
      const transactionIndex = updatedTransactions.findIndex(trans => trans.id === id);
      if (transactionIndex !== -1) {
        updatedTransactions[transactionIndex].statementVerified = true;
      }
      return updatedTransactions;
    })
  }

  const fetch = useCallback((
    keyword: string,
    type: 'reset' | 'pagination',
    status?: TransactionStatus
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
      .get(`/api/admin/transaction`, {
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
        setTransactions((prev) => type === 'reset' ? [...res.data] : [...prev, ...res.data]);
      })
      .catch((error: AxiosError) => {
        setTransactions([]);
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
      <MessageAlert
        open={messageDisplay}
        onOpenChange={setMessageDisplay}
        onCancel={() => {
          setMessageWakif(null);
        }}
        message={messageWakif}
      />
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
      <div className="p-4 rounded-lg bg-background mt-4">
        <Table>
          <TableHead>
            <TableHeadCol className="rounded-l-lg">Wakif</TableHeadCol>
            <TableHeadCol className="text-right">Jumlah Wakaf</TableHeadCol>
            <TableHeadCol>Status</TableHeadCol>
            <TableHeadCol className="min-w-[150px]">Kampanye Tujuan</TableHeadCol>
            <TableHeadCol>Status Verifikasi</TableHeadCol>
            <TableHeadCol>Tanggal</TableHeadCol>
            <TableHeadCol className="text-center rounded-r-lg">Aksi</TableHeadCol>
          </TableHead>
          <TableBody className="text-gray-700">
            {!searching && transactions
              .map((item, index) => {
                if (transactions.length === index + 1 && hasMore) return (
                  <TableRow ref={lastDataElementRef} key={item.id}>
                    <DataTableRow
                      data={item}
                      onClickMessage={(message) => {
                        setMessageWakif(message);
                        setMessageDisplay(true);
                      }}
                      onSuccessVerify={handleSuccessVerify}
                    />
                  </TableRow>
                )
                return (
                  <TableRow key={item.id}>
                    <DataTableRow
                      data={item}
                      onClickMessage={(message) => {
                        setMessageWakif(message);
                        setMessageDisplay(true);
                      }}
                      onSuccessVerify={handleSuccessVerify}
                    />
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
  )
}

export default DataTable