import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";
import { IoMdShare } from "react-icons/io";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaIdBadge,
  FaRegSmileBeam,
} from "react-icons/fa";
import TransactionInformation from "./transaction-information";

const TransactionCampaign = () => {
  return (
    <div>
      {/* OVERVIEW KAMPANYE */}
      <div className="bg-background rounded-md shadow-sm p-4">
        <TransactionInformation />
        <div className="flex flex-col sm:flex-row gap-x-2 sm:gap-x-4 gap-y-2 sm:gap-y-4 items-start">
          <div className="relative w-full max-w-[280px] sm:max-w-[250px] h-auto rounded-md overflow-hidden flex-shrink-0">
            <img
              src="https://fastly.picsum.photos/id/83/1600/900.jpg?hmac=R9BQdLAPaGw27suOHRBe6G6xb7m1XzQlbsx7as1N7-s"
              className="w-full h-auto object-cover"
              alt="campaign banner"
            />
            <div className="absolute left-2 top-2">
              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                Berjalan
              </Badge>
            </div>
          </div>
          <div className="space-y-1 flex-grow">
            <div className="space-y-1">
              <h2 className="text-sm sm:text-lg font-semibold leading-tight">
                Renovasi Pembangunan Masjid Pondok Pesantren
              </h2>
              <p className="text-justify line-clamp-2 md:line-clamp-3 text-sm md:text-base">
                Kampanye ini bertujuan untuk menyediakan alat-alat medis yang
                dibutuhkan oleh puskesmas-puskesmas di daerah pedalaman. Dengan
                adanya alat medis yang memadai, diharapkan pelayanan kesehatan
                di daerah tersebut dapat meningkat.
              </p>
            </div>
            <div className="hidden sm:flex gap-2 sm:mt-2">
              <Button variant="outline">
                <IoMdShare className="text-base" />
              </Button>
              <Link
                href="/dashboard/berwakaf?campaign_id=1"
                className="inline-block flex-1"
              >
                <Button
                  variant="secondary"
                  className="relative w-full max-w-xs"
                >
                  Donasi Lagi
                  <span className="absolute -top-2 -right-2 bg-sky-200 text-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    💰
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-4">
          <div className="flex flex-row justify-between">
            <div>
              <h4 className="text-xs sm:text-sm">Terkumpul</h4>
              <span className="block font-bold text-sm sm:text-lg text-green-500">
                Rp 0
              </span>
            </div>
            <div className="text-right">
              <h4 className="text-xs sm:text-sm">Kekurangan</h4>
              <span className="block font-bold text-sm sm:text-lg text-red-500">
                Rp 200.000.000
              </span>
            </div>
          </div>
          <div className="sm:mt-2">
            <span className="text-xs">Total: Rp 200.000.000</span>
            <Progress value={0} className="h-1.5 sm:h-2" />
          </div>
          <div className="flex sm:hidden gap-2 mt-4">
            <Button variant="outline">
              <IoMdShare className="text-base" />
            </Button>
            <Link
              href="/dashboard/berwakaf?campaign_id=1"
              className="inline-block flex-1"
            >
              <Button variant="secondary" className="relative w-full max-w-xs">
                Donasi sekarang
                <span className="absolute -top-2 -right-2 bg-sky-200 text-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  💰
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCampaign;
