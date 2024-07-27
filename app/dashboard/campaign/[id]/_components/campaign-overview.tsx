/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { Progress } from "../../../../../components/ui/progress";
import { cn, formatIndonesianDate, formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoMdShare } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { Campaign, User, UserRole } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShareContent from "@/components/shared/share-content";

interface IProps {
  className?: string;
  data: Omit<Campaign, "description"> & {
    creator?: User;
  };
  role: UserRole | null;
}

function CampaignOverview({ className, data, role }: IProps) {
  const navigate = useRouter();

  const detailImages = [data.image];

  const [mainImage, setMainImage] = useState(data.image);
  const [urlShare, setUrlShare] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrlShare(window.location.href);
    }
  }, []);

  return (
    <>
      <div className={cn("bg-background rounded-md shadow-sm p-4", className)}>
        <div className="w-full flex flex-col sm:flex-row justify-between gap-x-2 sm:items-end mb-2 sm:mb-1">
          {data.creator && (
            <span className="block text-xs sm:text-sm">
              Penyelenggara: {data.creator.name}
            </span>
          )}
          <span className="block text-xs sm:text-sm">
            Publikasi:{" "}
            <time className="italic">
              {formatIndonesianDate(data.createdAt)}
            </time>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-2 sm:gap-y-4">
          <div className="flex flex-col">
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border">
              <img
                src={mainImage}
                className="w-full h-full object-cover"
                alt="campaign banner"
              />
              <div className="absolute left-2 top-2">
                <Badge
                  variant={
                    data.status === "RUNNING"
                      ? "info"
                      : data.status === "CLOSED"
                        ? "destructive"
                        : "success"
                  }
                  className="text-[10px] sm:text-xs"
                >
                  {data.status === "RUNNING"
                    ? "Berjalan"
                    : data.status === "CLOSED"
                      ? "Ditutup"
                      : "Selesai"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="sm:space-y-2">
            <div className="w-full overflow-x-auto pb-1">
              <div className="w-max flex gap-2">
                {detailImages
                  .filter((img) => !!img)
                  .map((image, index) => (
                    <div
                      key={index}
                      className="relative w-[80px] aspect-[4/3] rounded-md border bg-muted overflow-hidden active:scale-95 transition"
                    >
                      <img
                        src={image!}
                        className="w-full h-full object-cover cursor-pointer"
                        alt={`Detail Image ${index + 1}`}
                        onClick={() => setMainImage(image!)}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <h2 className="text-sm sm:text-lg font-semibold leading-tight mt-2 sm:mt-0 sm:mb-4">
              {data.title}
            </h2>
            <span className="text-sm sm:text-xl text-secondary font-bold tracking-wide">
              {formatRupiah(data.target)}
            </span>
            <div className="flex justify-between text-gray-700 mt-1 sm:mt-2">
              <div>
                <h4 className="text-xs sm:text-base leading-3 text-gray-500">
                  Kategori
                </h4>
                <span className="block font-semibold text-sm sm:text-lg text-secondary capitalize">
                  {data.category}
                </span>
              </div>
              <div className="text-right">
                <h4 className="text-xs sm:text-base leading-3 text-gray-500">
                  Wakif
                </h4>
                <span className="block font-semibold text-sm sm:text-lg">
                  {data.numberOfWakif}
                </span>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            {data.status !== "RUNNING" && (
              <p className="text-xs p-2 bg-destructive/10 text-destructive rounded">
                Kampanye yang sudah selesai atau ditutup tidak bisa melakukan wakaf.
                Silahkan pilih kampanye lain:)
              </p>
            )}
            <div className="flex flex-row justify-between sm:mt-2">
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
              <span className="text-xs">
                Total: {formatRupiah(data.target)}
              </span>
              <Progress
                value={(data.collected / data.target) * 100}
                className="h-1.5 sm:h-2"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <ShareContent
                urlShare={urlShare}
                title="Bagikan kampanye"
                description="Yu ajak yang lain, melakukan kebaikan bersama!"
              />
              {role === "USER" && data.status === "RUNNING" ? (
                <Link
                  href={`/dashboard/berwakaf?campaign_id=${data.id}`}
                  className="inline-block flex-1"
                >
                  <Button variant="secondary" className="relative w-full">
                    Berwakaf sekarang
                    <span className="absolute -top-1.5 -right-1.5 bg-sky-200 text-secondary rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                      💰
                    </span>
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="secondary"
                  className="relative flex-1"
                  disabled={!!role}
                  onClick={() => {
                    if (!role) {
                      const callbackUrl = encodeURIComponent(
                        `/dashboard/berwakaf?campaign_id=${data.id}`
                      );
                      navigate.push(`/auth/login?callbackUrl=${callbackUrl}`);
                    }
                  }}
                >
                  Berwakaf sekarang
                  <span className="absolute -top-1.5 -right-1.5 bg-sky-200 text-secondary rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    💰
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampaignOverview;
