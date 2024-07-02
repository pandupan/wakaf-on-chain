import React from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const Donator = () => {
  const donations = [
    { name: "Anonim", amount: "Rp20.000", time: "Baru saja" },
    { name: "Ega Aprianto", amount: "Rp50.000", time: "3 hari yang lalu" },
    { name: "Pandu Pangestu", amount: "Rp100.000", time: "2 hari yang lalu" },
  ];

  return (
    <div className="bg-background rounded-md shadow-sm p-4 space-y-4 sticky top-0">
      <Link href="/dashboard/campaign/details/donatur">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Donatur
            <span className="ml-2 rounded-full bg-secondary text-white px-3 py-[2px] text-sm">
              89
            </span>
          </h2>
        </div>
      </Link>
      <div className="space-y-4">
        {donations.map((donation, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-gray-50 border px-4 py-3 rounded-lg shadow-sm"
          >
            <div className="w-12 aspect-square rounded-full flex items-center justify-center bg-gray-100 border">
              <FaUser className="text-gray-700" />
            </div>
            <div>
              <div className="font-bold">{donation.name}</div>
              <div className="text-gray-600 font-semibold text-secondary tracking-wide">
                {donation.amount}
              </div>
              <div className="text-gray-400 text-sm">{donation.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donator;
