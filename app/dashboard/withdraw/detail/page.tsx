import ContactCampaign from "@/components/shared/contact-campaign";
import OverviewCampaign from "./_components/overview-campaign";
import React from "react";
import WithdrawInformation from "./_components/withdraw-information";
import DetailWithdraw from "./_components/detail-withdraw";

function WithdrawPage() {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-secondary to-emerald-400 p-10 text-center rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-2">
          Terima kasih!
        </h1>
        <p className="text-white">
          Permintaan penarikan dana anda telah diterima dan sedang diproses.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <WithdrawInformation />
          <OverviewCampaign />
          <div className="p-4 rounded-md bg-muted">
            <p className="text-xs">
              <b>Untuk orang baik:</b> Terima kasih banyak atas dukungan anda. Penarikan dana ini akan membantu banyak orang. Semoga kebaikan anda dibalas dengan berlipat ganda.
            </p>
          </div>
          <ContactCampaign phone="1234567890" className="hidden lg:block px-0" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <DetailWithdraw />
          <ContactCampaign phone="1234567890" className="lg:hidden px-0" />
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
