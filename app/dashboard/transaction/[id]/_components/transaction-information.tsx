import { formatIndonesianDate } from "@/lib/utils";
import React from "react";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";

const TransactionInformation = () => {
  return (
    <>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaIdBadge className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">ID Transaksi</span>
        </div>
        <span className="text-gray-800 font-semibold">#ST157627430</span>
      </div>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">Tanggal</span>
        </div>
        <span className="text-gray-800 font-semibold">
          {formatIndonesianDate(new Date())}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaCheckCircle className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">Status</span>
        </div>
        <span className="text-green-600 flex items-center font-semibold">
          <FaCheckCircle className="mr-1" /> Berhasil
        </span>
      </div>
    </>
  );
};

export default TransactionInformation;
