'use client'

import InputSearch from "@/components/shared/input-search"
import CardHistoryWakaf from "./card-history-wakaf"
import { Campaign, Transaction } from "@prisma/client"
import { useState } from "react";

interface IProps {
  data: (Transaction & {
    campaign?: Campaign;
  })[];
}

function TransactionList({ data }: IProps) {
  const [transactions, setTransactions] = useState<IProps['data']>(data);

  return (
    <>
      <div className="max-w-sm">
        <InputSearch placeholder="Cari riwayat wakaf" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {transactions.map((item) => (
          <CardHistoryWakaf
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </>
  )
}

export default TransactionList