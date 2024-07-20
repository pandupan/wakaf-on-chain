import { formatIndonesianDate } from "@/lib/utils";
import { TransactionStatus } from "@prisma/client";
import React from "react";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaIdBadge,
  FaTimesCircle,
} from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

interface IProps {
  id: string;
  createdAt: Date;
  status: TransactionStatus;
}

function TransactionInformation({ createdAt, id, status }: IProps) {
  return (
    <>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaIdBadge className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">ID Transaksi</span>
        </div>
        <span className="text-gray-800 font-semibold">{id}</span>
      </div>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">Tanggal</span>
        </div>
        <span className="text-gray-800 font-semibold">
          {formatIndonesianDate(createdAt)}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaCheckCircle className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">Status</span>
        </div>
        {status === 'COMPLETED' && (
          <span className="text-green-500 flex items-center font-semibold">
            <FaCheckCircle className="mr-1" /> Berhasil
          </span>
        )}
        {status === 'PENDING' && (
          <span className="text-blue-500 flex items-center font-semibold">
            <FaClock className="mr-1" /> Pending
          </span>
        )}
        {status === 'FAILED' && (
          <span className="text-destructive flex items-center font-semibold">
            <FaTimesCircle className="mr-1" /> Dibatalkan
          </span>
        )}
      </div>
    </>
  );
};

export default TransactionInformation;
