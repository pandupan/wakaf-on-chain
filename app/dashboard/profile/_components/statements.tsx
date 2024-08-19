'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow
} from '@/components/core/table'
import { Button } from '@/components/ui/button';
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast';
import { formatIndonesianDate, formatRupiah } from '@/lib/utils'
import { Campaign, Transaction } from '@prisma/client';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'sonner';

interface IProps {
  data: (Pick<Transaction, 'amount' | 'id' | 'updatedAt' | 'createdAt'> & {
    campaign: Pick<Campaign, 'id' | 'title'>
  })[];
  limit: number;
  userId: string
}

function Statements({ data, limit, userId }: IProps) {
  const [statementTransactions, setStatementTransactions] = useState(data)
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null)
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null)

  const { handleAxiosErrorToast } = useAxiosErrorToast()

  const fetch = useCallback(() => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    axios
      .get(`/api/user/${userId}/statement-transactions`, {
        params: { cursor, limit: limit },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length === limit) {
          setCursor(res.data[res.data.length - 1].id);
          if (!hasMore) setHasMore(true);
        } else {
          setHasMore(false);
        }
        setStatementTransactions((prev) => [...prev, ...res.data]);
      })
      .catch((error: AxiosError) => {
        setStatementTransactions([]);
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
        setLoading(false);
      });
  }, [cursor]);

  return (
    <div className="bg-background p-4 rounded-xl shadow-sm space-y-2">
      <h2 className="text-lg font-bold text-secondary">Surat Pernyataan</h2>
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Tanggal</TableHeadCol>
          <TableHeadCol>Judul Kampanye</TableHeadCol>
          <TableHeadCol>Wakaf</TableHeadCol>
          <TableHeadCol align="center" className="rounded-r-lg">Aksi</TableHeadCol>
        </TableHead>
        <TableBody className="text-gray-700">
          {data.length > 0 ? (
            <>
              {statementTransactions.map((item, index) => (
                <TableRow key={index} isEven={index % 2 === 0}>
                  <TableCell className="rounded-l-lg">
                    {formatIndonesianDate(new Date(item.updatedAt), {
                      withoutDayName: true,
                      withoutTime: true
                    })}
                  </TableCell>
                  <TableCell>{item.campaign.title}</TableCell>
                  <TableCell>{formatRupiah(item.amount)}</TableCell>
                  <TableCell align="center" className="rounded-r-lg">
                    <Link href={`/wakaf-statement/${item.id}`} target="_blank" rel="noopener noreferrer">
                      <button className="text-blue-500">
                        <FaEye />
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="hover:bg-background">
                {!hasMore ? (
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Tidak ada lagi surat pernyataan
                  </TableCell>
                ) : (
                  <TableCell colSpan={4} className="text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-2"
                      disabled={loading}
                      onClick={fetch}
                    >
                      {loading && <VscLoading className="animate-spin" />}
                      Lebih banyak
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            </>
          ) : (
            <TableRow className="hover:bg-background">
              <TableCell colSpan={4} className="text-center text-gray-500">
                Anda belum mempunyai surat pernyataan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Statements
