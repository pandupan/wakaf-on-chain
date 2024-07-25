import React from "react";
import LayoutStatement from "./_components/layout-statement";
import { getUserByEmail } from "@/data/user";
import { ADMIN_EMAIL } from "@/lib/constants";
import { getTransactionById } from "@/data/transaction";
import { redirect } from "next/navigation";

interface IParams {
  transactionId: string;
}

async function WakafStatementPage({ params }: { params: IParams }) {
  const { transactionId } = params;
  const recipient = await getUserByEmail(ADMIN_EMAIL);
  const transaction = await getTransactionById(transactionId);

  if (!recipient || !transaction) redirect('/404');

  return (
    <div className="md:py-10 print:py-0 bg-gray-50">
      <LayoutStatement
        recipient={recipient}
        transaction={transaction!}
      />
    </div>
  );
};

export default WakafStatementPage;
