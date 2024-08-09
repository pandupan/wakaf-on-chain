'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatIndonesianDate } from "@/lib/utils";
import { TransactionStatus } from "@prisma/client";
import Link from "next/link";
import React from "react";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaIdBadge,
  FaTimesCircle,
} from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { RiFileList2Fill } from "react-icons/ri";
import ShareContent from "@/components/shared/share-content";

interface IProps {
  id: string;
  createdAt: Date;
  status: TransactionStatus;
  statementVerified: boolean;
}

function TransactionInformation({ createdAt, id, status, statementVerified }: IProps) {
  const [urlShare, setUrlShare] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrlShare(window.location.href);
    }
  }, []);

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
          {formatIndonesianDate(new Date(createdAt))}
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
      {status === 'COMPLETED' && (
        <div className="flex justify-between items-center text-sm sm:text-base">
          <div className="flex items-center">
            <RiFileList2Fill className="text-gray-500 mr-2" />
            <span className="text-gray-500 font-medium">Verifikasi</span>
          </div>
          <span className="text-gray-800 font-semibold">
            {statementVerified ? 'Sudah' : 'Belum'}
          </span>
        </div>
      )}
      {statementVerified && (
        <div className="w-full flex gap-2">
          <ShareContent
            urlShare={urlShare}
            title="Bagikan surat pernyataan wakaf"
            description="Ayo ajak rekan atau keluarga anda untuk berwakaf dengan membagikan surat pernyataan yang telah didapatkan!"
          />
          <Link href={`/wakaf-statement/${id}`} className="w-full" target="_blank" rel="noopener noreferrer">
            <Button className="w-full">
              Lihat surat pernyataan
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default TransactionInformation;
