import { auth } from "@/auth";
import { User } from "@prisma/client";
import { getUserByEmail } from "@/data/user";
import { redirect } from "next/navigation";
import Overview from "./_components/overview";
import { isAdmin } from "@/lib/utils";
import FormWithdrawLayout from "./_components/form-withdraw-layout";
import { getAllWithdrawalRequests } from "@/data/withdrawal-request";
import DataTable from "../request-withdrawal/_components/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getWithdrawOverview } from "@/data/balance";

const LIMIT = 10;

async function WithdrawPage() {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  const withdrawalRequests = await getAllWithdrawalRequests({
    sorted: 'updatedAt',
    limit: LIMIT
  });

  const overviewData = await getWithdrawOverview();

  if (!withdrawalRequests || !overviewData) redirect('/error');

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-7 space-y-4">
        <Overview data={overviewData} />
        <div className="p-4 rounded-lg bg-background">
          <p className="text-xs">
            <b>Penting:</b> Wakaf tersedia mencakup jumlah wakaf dari seluruh kampanye.
            Namun, jika ada permintaan penarikan oleh admin dengan status pending,
            jumlah wakaf tersedia akan dikurangi sesuai dengan jumlah permintaan penarikan tersebut.
          </p>
        </div>
        <div className="text-right lg:hidden">
          <Link href="/dashboard/withdraw/request">
            <Button
              size="sm"
              variant="secondary"
              className="text-xs"
            >
              Tarik Wakaf
            </Button>
          </Link>
        </div>
        <DataTable
          limit={LIMIT}
          data={withdrawalRequests}
          hiddenFilterAndSearch={true}
          title="Riwayat Penarikan"
        />
      </div>
      <div className="hidden lg:block lg:col-span-5">
        <FormWithdrawLayout />
      </div>
    </div>
  )
}

export default WithdrawPage