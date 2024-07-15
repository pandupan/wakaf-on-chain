import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaIdBadge,
} from "react-icons/fa";

const TransactionInformation = () => {
  return (
    <div>
      {/* INFORMASI TRANSAKSI */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-2 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="text-gray-500 font-medium">Tanggal</span>
          </div>
          <span className="text-gray-800 font-semibold">
            04 Juli 2024 - 03:28
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-gray-500 mr-2" />
            <span className="text-gray-500 font-medium">Metode pembayaran</span>
          </div>
          <span className="text-gray-800 font-semibold">Kantong Donasimu</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaIdBadge className="text-gray-500 mr-2" />
            <span className="text-gray-500 font-medium">ID donasi</span>
          </div>
          <span className="text-gray-800 font-semibold">#157627430</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-600 mr-2" />
            <span className="text-gray-500 font-medium">Status</span>
          </div>
          <span className="text-green-600 flex items-center font-semibold">
            <FaCheckCircle className="mr-1" /> Berhasil
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionInformation;
