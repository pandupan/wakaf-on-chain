"use client";

import React, { useState } from "react";
import ReactApexcharts from "@/components/core/react-apex-charts";
import { ApexOptions } from "apexcharts";
import { chartOptions } from "@/lib/chart";
import { BiLoaderAlt } from "react-icons/bi";

const categories: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const series = [
  {
    name: "Pemasukan",
    data: [
      1000, 1200, 900, 1400, 1500, 1300, 1700, 1600, 1800, 2000, 2100, 2200,
    ],
  },
];

const IncomeChart = () => {
  const [loading, setLoading] = useState(false);

  const dynamicOptions: ApexOptions = {
    ...chartOptions,
    xaxis: {
      ...chartOptions.xaxis,
      categories: categories,
    },
  };
  return (
    <div id="chartOne" className="relative -ml-4">
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
        width="100%"
      />
    </div>
  );
};

export default IncomeChart;
