'use client'
import React from 'react';
import { Progress } from '../../../../../components/ui/progress';
import { cn, formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { IoMdShare } from 'react-icons/io';
import { Badge } from '@/components/ui/badge';
import { Campaign, User } from '@prisma/client';
import Link from 'next/link';

interface IProps {
  className?: string;
  data: Omit<Campaign, 'description'> & {
    creator?: User
  }
}

function CampaignOverview({ className, data }: IProps) {
  return (
    <>
      <div
        className={cn(
          "bg-background rounded-md shadow-sm p-4",
          className
        )}
      >
        {data.creator && (
          <span className="block text-xs sm:text-sm mb-1">
            Dibuat oleh: {data.creator.name}
          </span>
        )}
        <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-2 sm:gap-y-4 ">
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
            <img
              src={data.image}
              className="w-full h-full object-cover"
              alt="campaign banner"
            />
            <div className="absolute left-2 top-2">
              <Badge
                variant={
                  data.status === 'RUNNING' ? 'info' : data.status === 'CLOSED' ? 'destructive' : 'success'
                }
                className="text-[10px] sm:text-xs"
              >
                {data.status === 'RUNNING' ? 'Berjalan' : data.status === 'CLOSED' ? 'Ditutup' : 'Selesai'}
              </Badge>
            </div>
          </div>
          <div className="sm:space-y-2 flex flex-col justify-between">
            <div>
              <h2 className="text-sm sm:text-lg font-semibold leading-tight">
                {data.title}
              </h2>
              <span className="text-sm sm:text-xl text-secondary font-bold tracking-wide">
                {formatRupiah(data.target)}
              </span>
              <div className="flex flex-row justify-between text-gray-700 mt-1 sm:mt-2">
                <div>
                  <h4 className="text-xs sm:text-base leading-3 text-gray-500">Kategori</h4>
                  <span className="block font-semibold text-sm sm:text-lg text-secondary capitalize">
                    {data.category}
                  </span>
                </div>
                <div className="text-right">
                  <h4 className="text-xs sm:text-base leading-3 text-gray-500">Wakif</h4>
                  <span className="block font-semibold text-sm sm:text-lg">
                    {data.numberOfWakif}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex gap-2 sm:mt-6">
              <Button variant="outline">
                <IoMdShare className="text-base" />
              </Button>
              {data.status === 'RUNNING' ? (
                <Link href={`/dashboard/berwakaf?campaign_id=${data.id}`} className="inline-block flex-1">
                  <Button
                    variant="secondary"
                    className="relative w-full"
                  >
                    Donasi sekarang
                    <span className="absolute -top-2 -right-2 bg-sky-200 text-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      💰
                    </span>
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="secondary"
                  className="relative flex-1"
                  disabled
                >
                  Donasi sekarang
                  <span className="absolute -top-2 -right-2 bg-sky-200 text-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    💰
                  </span>
                </Button>
              )}
            </div>
          </div>
          <div className="col-span-2">
            {data.status !== 'RUNNING' && (
              <p className="text-xs p-2 bg-destructive/10 text-destructive rounded">
                Kampanye yang sudah selesai atau ditutup tidak bisa berdonasi. Silahkan pilih kampanye lain:)
              </p>
            )}
            <div className="flex flex-row justify-between mt-2">
              <div>
                <h4 className="text-xs sm:text-sm">Terkumpul</h4>
                <span className="block font-bold text-sm sm:text-lg text-green-500">
                  {formatRupiah(data.collected)}
                </span>
              </div>
              <div className="text-right">
                <h4 className="text-xs sm:text-sm">Kekurangan</h4>
                <span className="block font-bold text-sm sm:text-lg text-red-500">
                  {formatRupiah(data.remaining)}
                </span>
              </div>
            </div>
            <div className="sm:mt-2">
              <span className="text-xs">Total: {formatRupiah(data.target)}</span>
              <Progress value={(data.collected / (data.remaining)) * 100} className="h-1.5 sm:h-2" />
            </div>
            <div className="flex sm:hidden gap-2 mt-4">
              <Button size="sm" variant="outline">
                <IoMdShare className="text-xs" />
              </Button>
              <Button size="sm" variant="secondary" className="relative flex-1 text-xs">
                Donasi sekarang
                <span className="absolute -top-2 -right-2 bg-sky-200 text-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  💰
                </span>
              </Button>
            </div>
          </div>
          <div className="col-span-2 p-4 rounded-md bg-muted">
            <p className="text-xs">
              <b>Disclaimer:</b> Kampanye ini diadakan secara resmi oleh pengurus dari Pondok Pesantren Mahasiswa Al-Ihsan dan menjadi tanggung jawabnya. Jika ada masalah atau kecurigaan silahkan <a href="#" className="text-secondary underline">laporkan kepada pihak pengembang.</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampaignOverview;
