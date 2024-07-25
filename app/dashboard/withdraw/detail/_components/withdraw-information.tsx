import React from "react";
import {
  FaCalendarAlt,
  FaIdBadge,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

function WithdrawInformation() {
  return (
    <>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaIdBadge className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">ID Penarikan</span>
        </div>
        <span className="text-gray-800 font-semibold">123456</span>
      </div>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">Tanggal</span>
        </div>
        <span className="text-gray-800 font-semibold">
          20 Juli 2024
        </span>
      </div>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaCheckCircle className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">Status</span>
        </div>
        <span className="text-green-500 flex items-center font-semibold">
          <FaCheckCircle className="mr-1" /> Berhasil
        </span>
        {/* Untuk status lain, bisa gunakan yang di bawah ini */}
        {/* <span className="text-blue-500 flex items-center font-semibold">
          <FaClock className="mr-1" /> Pending
        </span> */}
        {/* <span className="text-red-500 flex items-center font-semibold">
          <FaTimesCircle className="mr-1" /> Dibatalkan
        </span> */}
      </div>
    </>
  );
}

export default WithdrawInformation;
