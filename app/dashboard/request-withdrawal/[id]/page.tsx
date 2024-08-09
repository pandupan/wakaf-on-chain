import ContactCampaign from "@/components/shared/contact-campaign";
import OverviewCampaign from "./_components/overview-campaign";
import WithdrawInformation from "./_components/withdraw-information";
import DetailWithdraw from "./_components/detail-withdraw";
import PopupPayment from "./_components/popup-payment";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import { getUserByEmail } from "@/data/user";
import { isAdmin } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getWithdrawalRequestById } from "@/data/withdrawal-request";
import { IoMdDownload } from "react-icons/io";

interface IParams {
  id: string;
};

async function WithdrawPage({ params }: { params: IParams }) {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  const withdrawalRequest = await getWithdrawalRequestById(params.id);

  if (!withdrawalRequest) redirect('/error');

  return (
    <div className="space-y-4">
      {withdrawalRequest.status === 'PENDING' && (
        <div className="bg-gradient-to-r from-secondary to-emerald-400 p-10 text-center rounded-lg">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {user!.role !== 'SUPER_ADMIN' ?
              'Terima kasih!' :
              'Penarikan wakaf'}
          </h1>
          <p className="text-sm sm:text-base text-white">
            {user!.role !== 'SUPER_ADMIN' ?
              'Permintaan penarikan dana anda telah diterima dan sedang diproses.' :
              'Silahkan transfer wakaf ke akun penarikan yang tertera dan upload bukti pembayaran.'}
          </p>
        </div>
      )}
      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <WithdrawInformation
            createdAt={withdrawalRequest.createdAt}
            id={withdrawalRequest.id}
            status={withdrawalRequest.status}
          />
          <OverviewCampaign data={withdrawalRequest.campaign} />
          {withdrawalRequest.proofPayment && (
            <div className="relative">
              <h1 className="font-bold">Bukti Transfer</h1>
              <div className="border rounded-lg h-[200px]">
                <img
                  src={withdrawalRequest.proofPayment}
                  alt="proof payment image"
                  className="w-full h-full object-contain"
                />
              </div>
              <a
                href={withdrawalRequest.proofPayment}
                download={`bukti_transfer_${withdrawalRequest.id}.jpg`}
                className="
                  absolute 
                  bottom-3 
                  right-3 
                  p-2 
                  rounded-full 
                  border 
                  bg-foreground 
                  text-background 
                  hover:shadow-md 
                "
              >
                <IoMdDownload />
              </a>
            </div>
          )}
          {withdrawalRequest.rejectedNote && (
            <div>
              <h1 className="font-bold">Alasan Ditolak</h1>
              <p className="p-4 border rounded-lg text-sm sm:text-base italic text-gray-500">
                {withdrawalRequest.rejectedNote}
              </p>
            </div>
          )}
          {(withdrawalRequest.status === 'PENDING') && (user!.role === 'SUPER_ADMIN') && (
            <PopupPayment
              withdrawalRequestId={withdrawalRequest.id}
              paymentData={{
                methodAccountHolder: withdrawalRequest.methodAccountHolder,
                methodAccountNumber: withdrawalRequest.methodAccountNumber,
                methodBankName: withdrawalRequest.methodBankName,
              }}
            />
          )}
          {user!.role !== 'SUPER_ADMIN' && (
            <ContactCampaign
              phone={withdrawalRequest.campaign.phone}
              className="hidden lg:block px-0"
            />
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <DetailWithdraw
            paymentData={{
              methodAccountHolder: withdrawalRequest.methodAccountHolder,
              methodAccountNumber: withdrawalRequest.methodAccountNumber,
              methodBankName: withdrawalRequest.methodBankName,
            }}
            user={{ ...withdrawalRequest.user }}
            amount={withdrawalRequest.amount}
            description={withdrawalRequest.description}
          />
          {user!.role !== 'SUPER_ADMIN' && (
            <ContactCampaign
              phone={withdrawalRequest.campaign.phone}
              className="lg:hidden px-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
