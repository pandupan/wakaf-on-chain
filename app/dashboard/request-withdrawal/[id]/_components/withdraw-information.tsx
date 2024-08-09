import { formatIndonesianDate } from "@/lib/utils";
import { WithdrawalStatus } from "@prisma/client";
import {
  FaCalendarAlt,
  FaIdBadge,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

interface IProps {
  id: string;
  createdAt: Date;
  status: WithdrawalStatus;
}

function WithdrawInformation({ createdAt, id, status }: IProps) {
  return (
    <>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaIdBadge className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">ID Penarikan</span>
        </div>
        <span className="text-gray-800 font-semibold">{id}</span>
      </div>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">Tanggal</span>
        </div>
        <span className="text-gray-800 font-semibold">
          {formatIndonesianDate(new Date(createdAt))}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <div className="flex items-center">
          <FaCheckCircle className="text-gray-500 mr-2" />
          <span className="text-gray-500 font-medium">Status</span>
        </div>
        {status === 'APPROVED' && (
          <span className="text-green-500 flex items-center font-semibold">
            <FaCheckCircle className="mr-1" /> Disetujui
          </span>
        )}
        {status === 'PENDING' && (
          <span className="text-blue-500 flex items-center font-semibold">
            <FaClock className="mr-1" /> Pending
          </span>
        )}
        {status === 'REJECTED' && (
          <span className="text-destructive flex items-center font-semibold">
            <FaTimesCircle className="mr-1" /> Ditolak
          </span>
        )}
      </div>
    </>
  );
}

export default WithdrawInformation;
