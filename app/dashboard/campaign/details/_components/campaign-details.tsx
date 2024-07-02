'use client'
import React from 'react';
import { Progress } from '../../../../../components/ui/progress';
import { cn } from '@/lib/utils';
import { FaShareAlt } from 'react-icons/fa'; // Importing icons from FontAwesome
import { FiUsers, FiClock } from 'react-icons/fi'; // Importing additional icons
import Link from 'next/link';

interface IProps {
  className?: string;
}

function CampaignDetails({ className }: IProps) {
  return (
    <div
      className={cn(
        "bg-background rounded-md shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-2 sm:gap-y-4 p-4",
        className
      )}
    >
      <div className="w-full aspect-video rounded-md overflow-hidden">
        <img
          src="https://picsum.photos/id/83/1600/900"
          className="w-full h-full object-cover"
          alt="campaign 1"
        />
      </div>
      <div className="sm:space-y-2 flex flex-col justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-semibold leading-tight">
            Wakaf untuk Kebutuhan Mesjid
          </h2>
          <span className="text-sm sm:text-base text-green-600 font-semibold tracking-wide">
            Rp12.000.000
          </span>
          <div className="flex flex-row justify-between text-gray-700 mt-2">
            <div className="flex items-center space-x-2">
              <FiUsers className="text-secondary text-base" />
              <div>
                <h4 className="text-xs italic leading-3 text-gray-500">Donatur</h4>
                <span className="block font-semibold text-xs sm:text-sm">89</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FiClock className="text-red-500 text-base" />
              <div>
                <h4 className="text-xs italic leading-3 text-gray-500">Sisa Hari</h4>
                <span className="block font-semibold text-xs sm:text-sm text-right">1</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-sm sm:text-base italic">Detail</h3>
            <div className="border-b w-full my-1.5" />
            <p className="line-clamp-2 sm:line-clamp-3 lg:line-clamp-2 xl:line-clamp-5 text-xs sm:text-sm text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
              laborum deserunt quos blanditiis, nostrum hic dolore aperiam id
              explicabo animi accusamus veritatis libero non? Obcaecati
              quibusdam autem nemo ratione quam.
            </p>
            <Link href="/dashboard/campaign/details/deskripsi">
            <button className="text-blue-500 text-xs sm:text-sm mt-1">
              Baca Selengkapnya
            </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row space-x-4 justify-end mt-6">
          <button className="relative border border-blue-600 rounded-md px-4 py-2 text-xs sm:text-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-transform duration-300 flex items-center">
            <FaShareAlt className="text-base" />
          </button>
          <button className="relative border border-green-600 rounded-md px-6 py-2 text-xs sm:text-sm bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition-transform duration-300">
            Donasi sekarang
            <span className="absolute -top-2 -right-2 bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              💰
            </span>
          </button>
        </div>
      </div>
      <div className="sm:col-span-2 mt-4 sm:mt-0">
        <div className="flex flex-row justify-between">
          <div>
            <h4 className="text-xs leading-3">Terkumpul</h4>
            <span className="block font-semibold text-xs sm:text-sm text-green-600">
              Rp9.835.000
            </span>
          </div>
          <div className="text-right">
            <h4 className="text-xs leading-3">Kekurangan</h4>
            <span className="block font-semibold text-xs sm:text-sm text-green-600">
              Rp805.000
            </span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xs sm:text-sm">Total: Rp12.000.000</span>
          <Progress value={82} className="h-1.5 sm:h-2 mt-1 sm:mt-2 " />
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
