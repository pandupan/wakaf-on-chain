import TransactionInformation from "./_components/transaction-information";
import DetailOrder from "./_components/detail-order";
import ContactCampaign from "@/components/shared/contact-campaign";
import OverviewCampaign from "./_components/overview-campaign";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import { getUserByEmail } from "@/data/user";
import { redirect } from "next/navigation";
import { getTransactionById } from "@/data/transaction";

interface IParams {
  id: string;
};

async function TransactionPage({ params }: { params: IParams }) {
  const session = await auth();

  const user = await getUserByEmail(session?.user.email!);
  const transaction = await getTransactionById(params.id);

  if (!user || !transaction || (user.id !== transaction?.userId)) {
    redirect('/404');
  }

  return (
    <div className="space-y-4">
      {transaction.status === 'COMPLETED' && (
        <div className="bg-gradient-to-r from-secondary to-emerald-400 p-10 text-center rounded-lg">
          <h1 className="text-2xl font-bold text-white mb-2">
            Terima kasih!
          </h1>
          <p className="text-white">
            Donasimu telah diterima dan akan segera disalurkan
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <TransactionInformation
            createdAt={transaction.createdAt}
            id={transaction.id}
            status={transaction.status}
          />
          <OverviewCampaign data={transaction.campaign} />
          <div className="p-4 rounded-md bg-muted">
            <p className="text-xs">
              <b>Untuk orang baik:</b> Terima kasih banyak atas wakaf uang yang Anda berikan. Kontribusi Anda sangat berarti dan akan membantu banyak orang. Semoga kebaikan Anda dibalas dengan berlipat ganda.
            </p>
          </div>
          <ContactCampaign
            phone={transaction.campaign.phone}
            className="hidden lg:block px-0"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <DetailOrder
            id={transaction.id}
            amount={transaction.amount}
            email={transaction.email}
            message={transaction.message}
            name={transaction.name}
            isHiddenName={transaction.isHiddenName}
            paymentLabel={transaction.paymentMethodLabel}
            user={transaction.user!}
            status={transaction.status}
          />
          <ContactCampaign
            phone={transaction.campaign.phone}
            className="lg:hidden px-0"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
