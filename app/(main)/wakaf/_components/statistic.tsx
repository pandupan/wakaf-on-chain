'use client'

import React, { useState } from "react";
import { GridItemProps, Tooltips } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

// Data Dummy
const waqfData: any = {
  2019: [
    { name: 'Jan', Income: 45000000, Expenditure: 30000000 },
    { name: 'Feb', Income: 55000000, Expenditure: 35000000 },
    { name: 'Mar', Income: 50000000, Expenditure: 40000000 },
    { name: 'Apr', Income: 60000000, Expenditure: 50000000 },
    { name: 'May', Income: 55000000, Expenditure: 45000000 },
    { name: 'Jun', Income: 65000000, Expenditure: 50000000 },
    { name: 'Jul', Income: 60000000, Expenditure: 55000000 },
    { name: 'Aug', Income: 70000000, Expenditure: 60000000 },
    { name: 'Sep', Income: 75000000, Expenditure: 65000000 },
    { name: 'Oct', Income: 80000000, Expenditure: 70000000 },
    { name: 'Nov', Income: 85000000, Expenditure: 75000000 },
    { name: 'Dec', Income: 90000000, Expenditure: 80000000 },
  ],
  2020: [
    { name: 'Jan', Income: 48000000, Expenditure: 31000000 },
    { name: 'Feb', Income: 56000000, Expenditure: 36000000 },
    { name: 'Mar', Income: 51000000, Expenditure: 41000000 },
    { name: 'Apr', Income: 61000000, Expenditure: 51000000 },
    { name: 'May', Income: 57000000, Expenditure: 46000000 },
    { name: 'Jun', Income: 67000000, Expenditure: 52000000 },
    { name: 'Jul', Income: 62000000, Expenditure: 56000000 },
    { name: 'Aug', Income: 72000000, Expenditure: 61000000 },
    { name: 'Sep', Income: 77000000, Expenditure: 66000000 },
    { name: 'Oct', Income: 82000000, Expenditure: 71000000 },
    { name: 'Nov', Income: 87000000, Expenditure: 76000000 },
    { name: 'Dec', Income: 92000000, Expenditure: 81000000 },
  ],
  2021: [
    { name: 'Jan', Income: 46000000, Expenditure: 29000000 },
    { name: 'Feb', Income: 53000000, Expenditure: 33000000 },
    { name: 'Mar', Income: 49000000, Expenditure: 38000000 },
    { name: 'Apr', Income: 58000000, Expenditure: 48000000 },
    { name: 'May', Income: 54000000, Expenditure: 43000000 },
    { name: 'Jun', Income: 62000000, Expenditure: 49000000 },
    { name: 'Jul', Income: 59000000, Expenditure: 52000000 },
    { name: 'Aug', Income: 68000000, Expenditure: 57000000 },
    { name: 'Sep', Income: 73000000, Expenditure: 62000000 },
    { name: 'Oct', Income: 78000000, Expenditure: 67000000 },
    { name: 'Nov', Income: 83000000, Expenditure: 72000000 },
    { name: 'Dec', Income: 88000000, Expenditure: 77000000 },
  ],
  2022: [
    { name: 'Jan', Income: 47000000, Expenditure: 30000000 },
    { name: 'Feb', Income: 54000000, Expenditure: 34000000 },
    { name: 'Mar', Income: 50000000, Expenditure: 39000000 },
    { name: 'Apr', Income: 59000000, Expenditure: 49000000 },
    { name: 'May', Income: 55000000, Expenditure: 44000000 },
    { name: 'Jun', Income: 63000000, Expenditure: 50000000 },
    { name: 'Jul', Income: 60000000, Expenditure: 53000000 },
    { name: 'Aug', Income: 69000000, Expenditure: 58000000 },
    { name: 'Sep', Income: 74000000, Expenditure: 63000000 },
    { name: 'Oct', Income: 79000000, Expenditure: 68000000 },
    { name: 'Nov', Income: 84000000, Expenditure: 73000000 },
    { name: 'Dec', Income: 89000000, Expenditure: 78000000 },
  ],
  2023: [
    { name: 'Jan', Income: 45000000, Expenditure: 30000000 },
    { name: 'Feb', Income: 52000000, Expenditure: 34000000 },
    { name: 'Mar', Income: 48000000, Expenditure: 38000000 },
    { name: 'Apr', Income: 57000000, Expenditure: 48000000 },
    { name: 'May', Income: 53000000, Expenditure: 43000000 },
    { name: 'Jun', Income: 61000000, Expenditure: 49000000 },
    { name: 'Jul', Income: 58000000, Expenditure: 52000000 },
    { name: 'Aug', Income: 67000000, Expenditure: 57000000 },
    { name: 'Sep', Income: 72000000, Expenditure: 62000000 },
    { name: 'Oct', Income: 77000000, Expenditure: 67000000 },
    { name: 'Nov', Income: 82000000, Expenditure: 72000000 },
    { name: 'Dec', Income: 87000000, Expenditure: 77000000 },
  ],
  2024: [
    { name: 'Jan', Income: 46000000, Expenditure: 31000000 },
    { name: 'Feb', Income: 53000000, Expenditure: 40000000 },
    { name: 'Mar', Income: 39000000, Expenditure: 39000000 },
    { name: 'Apr', Income: 58000000, Expenditure: 49000000 },
    { name: 'May', Income: 54000000, Expenditure: 44000000 },
    { name: 'Jun', Income: 62000000, Expenditure: 50000000 },
    { name: 'Jul', Income: 40000000, Expenditure: 53000000 },
    { name: 'Aug', Income: 68000000, Expenditure: 58000000 },
    { name: 'Sep', Income: 73000000, Expenditure: 80000000 },
    { name: 'Oct', Income: 58000000, Expenditure: 68000000 },
    { name: 'Nov', Income: 83000000, Expenditure: 73000000 },
    { name: 'Dec', Income: 88000000, Expenditure: 78000000 },
  ]
};

function GridItem({ title, children }: GridItemProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 bg-white rounded-xl h-[400px] w-full">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: Tooltips) => {
  if (active && payload && payload.length) {
    const income = payload[0].value;
    const expenditure = payload[1].value;
    const balance = income - expenditure;

    return (
      <div className="p-4 bg-white border border-gray-300 flex flex-col gap-4 rounded-md shadow-lg font-semibold">
        <p className="text-medium text-lg text-gray-900">{label}</p>
        <p className="text-sm text-green-500">
          Pemasukan:
          <span className="ml-2">Rp {income.toLocaleString()}</span>
        </p>
        <p className="text-sm text-blue-500">
          Pengeluaran:
          <span className="ml-2">Rp {expenditure.toLocaleString()}</span>
        </p>
        <p className={`text-sm ${balance >= 0 ? 'text-black' : 'text-red-500'}`}>
          Saldo:
          <span className="ml-2">Rp {balance.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

const Statistic = () => {
  const [year, setYear] = useState('2024');
  const handleYearSelect = (selectedYear: string) => {
    setYear(selectedYear);
  };

  return (
    <div id="statistic" className="relative mt-10">
      <div className="relative container overflow-hidden space-y-4 sm:space-y-8">
        <h1 className="text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
          Data Pengeluaran dan Pemasukan
        </h1>
        <p className="md:text-center xl:text-lg text-justify max-w-5xl mx-auto">
          Melalui penerapan teknologi blockchain, dapat memberikan
          pembaharuan data secara realtime dan transparansi dalam pengelolaan wakaf. Setiap transaksi
          dan alokasi dana dapat dilacak, serta memberikan kepercayaan dan keamanan bagi
          para donatur dan penerima manfaat.
        </p>

        <div>
          <GridItem title={`Pemasukan dan Pengeluaran Wakaf (${year})`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={waqfData[year]}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value / 1000000}JT`} />
                <Tooltip
                  content={
                    <CustomTooltip
                      active={undefined}
                      payload={undefined}
                      label={undefined}
                    />
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Income"
                  stroke="#1dbbb4"
                  strokeWidth={2.5}
                  name="Pemasukan"
                />
                <Line
                  type="monotone"
                  dataKey="Expenditure"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  name="Pengeluaran"
                />
              </LineChart>
            </ResponsiveContainer>
          </GridItem>
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
