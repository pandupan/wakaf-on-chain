import { redirect } from "next/navigation"
import { getAllTransactions } from "@/data/transaction"
import TransactionList from "./_components/transaction-list";
import { auth } from "@/auth";

const LIMIT = 12;

async function TransactionPage() {
  const session = await auth();

  const transactions = await getAllTransactions({
    limit: LIMIT,
    userId: session?.user.id
  });

  if (transactions === null) redirect('/error');

  return (
    <div className="space-y-4">
      <TransactionList
        data={transactions}
        limit={LIMIT}
      />
    </div>
  )
}

export default TransactionPage