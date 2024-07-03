'use client'

import React from "react";
import Image from "next/image";
import IncomeChart from "../../../../components/shared/income-chart";

const Statistic = () => {
  return (
    <div id="statistic" className="relative py-20">
      <div className="relative px-4 sm:container overflow-hidden space-y-4 sm:space-y-8">
        <h1 className="text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
          Data Pemasukan Wakaf Uang
        </h1>
        <p className="md:text-center xl:text-lg text-justify max-w-5xl mx-auto">
          Melalui grafik ini, data pemasukan wakaf uang menjadi transparansi dalam pengelolaan wakaf. Setiap transaksi
          dan alokasi dana dapat dilacak, serta memberikan kepercayaan dan keamanan bagi
          para donatur dan penerima manfaat.
        </p>
        <IncomeChart />
      </div>
      <div className="absolute -bottom-20 -left-12 -z-[1]">
        <div className="relative aspect-square w-[608px] h-[656px]">
          <Image
            src="/images/bg-vector-3-2.png"
            alt="bg-vector"
            fill={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
