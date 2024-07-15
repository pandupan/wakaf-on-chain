import { Separator } from "@/components/ui/separator";
import React from "react";

const NominalDonation = () => {
  return (
    <div>
      {/* TOTAL DONASI */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500 font-medium">Total donasi</span>
          <span className="text-gray-800 font-semibold">Rp1.000</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between mb-2">
          <span className="text-gray-500 font-medium">Nominal donasi</span>
          <span className="text-gray-800 font-semibold">Rp1.000</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">
            Donasi SalingJaga Dhuafa (opsional)
          </span>
          <span className="text-gray-800 font-semibold">Rp0</span>
        </div>
      </div>
    </div>
  );
};

export default NominalDonation;
