import React from "react";
import Image from "next/image";
import IncomeChart from "../../../../components/shared/income-chart";
import { getWakafIncomeLastYear } from "@/data/overview";

const Statistic = async () => {
  const chartData = await getWakafIncomeLastYear();

  if (!chartData.series.length || !chartData.categories.length) return null;

  return (
    <div id="statistic" className="relative py-10 sm:py-20">
      <div className="relative overflow-hidden space-y-4 sm:space-y-8">
        <div className="container mx-auto space-y-4 sm:space-y-8">
          <h1 className="sm:text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
            Data Pemasukan Wakaf Uang
          </h1>
          <p className="md:text-center xl:text-lg text-justify max-w-5xl mx-auto">
            Melalui grafik ini, data pemasukan wakaf uang menjadi transparansi dalam pengelolaan wakaf. Setiap transaksi
            dan alokasi dana dapat dilacak, serta memberikan kepercayaan dan keamanan bagi
            para donatur dan penerima manfaat.
          </p>
        </div>
        <div className="px-4 sm:container mx-auto">
          <IncomeChart data={chartData} label="Pemasukan" />
        </div>
      </div>
      <div className="absolute -bottom-20 -left-12 -z-[1]">
        <div className="relative aspect-square w-[400px] h-[450px] md:w-[608px] md:h-[656px]">
          <Image
            src="/images/bg-vector-3-2.png"
            alt="bg-vector"
            fill={true}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
