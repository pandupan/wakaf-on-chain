'use client'

import React, { useState } from "react";
import Image from "next/image";
import ReactApexcharts from "@/components/react-apex-charts";
import { ApexOptions } from "apexcharts";
import { statisticOptions } from "@/lib/types";
import { BiLoaderAlt } from "react-icons/bi";

const categories: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const series = [
  {
    name: "Pemasukan",
    data: [1000, 1200, 900, 1400, 1500, 1300, 1700, 1600, 1800, 2000, 2100, 2200]
  }
];

const Statistic = () => {
  const [loading, setLoading] = useState(false)

  const dynamicOptions: ApexOptions = {
    ...statisticOptions,
    xaxis: {
      ...statisticOptions.xaxis,
      categories: categories,
    },
  }

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

        <div id="chartOne" className="relative -ml-5">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-background/50 backdrop-blur z-[1]">
              <BiLoaderAlt className="w-4 h-4 animate-spin" />
            </div>
          )}
          <ReactApexcharts
            options={dynamicOptions}
            series={series}
            type="area"
            height={450}
            width={"100%"}
          />
        </div>
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
