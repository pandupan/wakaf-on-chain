import { auth } from "@/auth";
import HistoryWithdraw from "./_components/history-withdraw"
import { User } from "@prisma/client";
import { getUserByEmail } from "@/data/user";
import { redirect } from "next/navigation";
import Overview from "./_components/overview";
import { isAdmin } from "@/lib/utils";
import FormWithdrawLayout from "./_components/form-withdraw-layout";

async function WithdrawPage() {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-7 space-y-4">
        <Overview />
        <HistoryWithdraw />
      </div>
      <div className="col-span-12 lg:col-span-5">
        <FormWithdrawLayout />
      </div>
    </div>
  )
}

export default WithdrawPage