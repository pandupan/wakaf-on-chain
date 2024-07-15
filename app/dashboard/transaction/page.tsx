import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaIdBadge,
  FaQuestionCircle,
} from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import TransactionCampaign from "./_components/transaction-campaign";
import TransactionInformation from "./_components/transaction-information";
import NominalDonation from "./_components/nominal-donation";

const Transaction = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="flex flex-col gap-4 w-full">
          {/* HEADER */}
          <div className="bg-white p-4 rounded-lg shadow-sm text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-75"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              Terima kasih!
            </h1>
            <p className="text-white">
              Donasimu telah diterima dan akan segera disalurkan
            </p>
          </div>
        </div>
          {/* OVERVIEW KAMPANYE */}
          <TransactionCampaign />
          {/* TOTAL DONASI */}
          <NominalDonation />
          {/* BANTUAN BUTTON */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Link href="#">
              <div className="flex justify-start items-center">
                <Button
                  variant="link"
                  className="text-primary flex items-center gap-2"
                >
                  <FaQuestionCircle className="text-base" />
                  Bantuan
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transaction;
