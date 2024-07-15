import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const DetailOrder = () => {
  return (
    <>
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nama Lengkap</span>
          <span className="text-right">Aam Hermansyah (anonim)</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Email/Nomor Ponsel</span>
          <span className="text-right">aamhermansyah@gmail.com</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Wakaf</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Atas Nama</span>
          <span className="font-bold text-right">Aam Hermansyah</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Transaksi</span>
          <span className="text-right">DANA</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nominal</span>
          <span className="font-bold text-right">Rp100.000</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Pesan atau Doa</h1>
        <div className="p-4 border rounded-md">
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eos repudiandae inventore provident earum dignissimos, tenetur nam animi expedita? Quos debitis molestiae iure nobis vitae voluptatem delectus maiores hic natus magnam. Iusto commodi dignissimos omnis. Repudiandae sequi iure distinctio deleniti sint, iste magnam deserunt cum dolorem dolor? Hic, itaque quis!
          </p>
        </div>
      </div>
      <Button variant="secondary" className="w-full">
        Donasi lagi
      </Button>
    </>
  );
};

export default DetailOrder;
