import { redirect } from "next/navigation"
import { getAllTransactions } from "@/data/transaction"
import TransactionList from "./_components/transaction-list";

const LIMIT = 9;

async function HistoryPage() {
  const transactions = await getAllTransactions({ limit: LIMIT });

  if (transactions === null) redirect('/error');

  return (
    <div className="space-y-4">
      <TransactionList data={transactions} />
    </div>
  )
}

export default HistoryPage