'use client'

import React from "react";
import { Separator } from "@/components/ui/separator";
import PopupPayment from "@/components/shared/popup-payment";

function DetailWithdraw() {

  return (
    <>
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nama Lengkap</span>
          <span className="text-right">Ega Aprianto</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Email/Nomor Ponsel</span>
          <span className="text-right">227006018@student.unsil.ac.id</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Penarikan</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Penarikan</span>
          <span className="text-right">DANA</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">No. Rek/Telepon</span>
          <span className="text-right">081395123421</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Jumlah</span>
          <span className="font-bold text-right">Rp2.500.000</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Pesan atau Catatan</h1>
        <div className="p-4 border rounded-md">
          <p className="text-gray-400 italic">
            "Permintaan penarikan dana untuk kebutuhan mendesak."
          </p>
        </div>
      </div>
      <PopupPayment/>
    </>
  );
}

export default DetailWithdraw;
