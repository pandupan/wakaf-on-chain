'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaCheckCircle, FaTimesCircle, FaCamera } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function DetailWithdraw() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <div className="w-full flex justify-between gap-2">
        <Button variant="destructive" className="w-full gap-2">
          <FaTimesCircle className="mr-1" /> Tolak
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full gap-2">
              <FaCheckCircle className="mr-1" /> Terima
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md p-4">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Upload Bukti Pembayaran</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Silakan upload bukti pembayaran untuk menyelesaikan transaksi.
              </DialogDescription>
            </DialogHeader>
            <div className=" bg-gray-200 text-center rounded-lg p-4">
              <span className="block text-sm font-medium text-gray-700">
                BANK BCA - DEZA ADYTIAR NUR ARIEF (Admin)
              </span>
              <span className="block text-blue-600 text-lg font-bold">
                58105123421
              </span>
            </div>
            <div>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaCamera className="w-12 h-12 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span> atau seret dan lepas</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={() => setIsDialogOpen(false)} variant="destructive">
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default DetailWithdraw;
