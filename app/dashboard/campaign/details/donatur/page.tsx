"use client";

import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [sortOption, setSortOption] = useState("Terbaru");

  const donations = [
    { name: "Orang Baik", amount: 20000, time: "Baru saja", timestamp: 1 },
    { name: "Orang Baik", amount: 20000, time: "7 jam yang lalu", timestamp: 7 },
    { name: "Orang Baik", amount: 100000, time: "2 hari yang lalu", timestamp: 48 },
    { name: "Orang Baik", amount: 50000, time: "3 hari yang lalu", timestamp: 72 },
    { name: "Orang Baik", amount: 70000, time: "4 hari yang lalu", timestamp: 96 },
    { name: "Orang Baik", amount: 200000, time: "5 hari yang lalu", timestamp: 120 },
  ];

  const getSortedDonations = () => {
    if (sortOption === "Terbaru") {
      return [...donations].sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortOption === "Terbesar") {
      return [...donations].sort((a, b) => b.amount - a.amount);
    }
    return donations;
  };

  const sortedDonations = getSortedDonations();

  return (
    <div className="bg-background rounded-md shadow-sm p-4 space-y-4">
      <Link href="/dashboard/campaign/details">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <h2 className="text-xl font-semibold">
            Donatur
            <span className="ml-2 rounded-full bg-secondary text-white px-3 py-[2px] text-sm">
              89
            </span>
          </h2>
        </div>
      </Link>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full ${
              sortOption === "Terbaru" ? "bg-blue-100 text-blue-500" : "bg-white text-gray-500 border border-gray-300"
            }`}
            onClick={() => setSortOption("Terbaru")}
          >
            Terbaru
          </button>
          <button
            className={`px-3 py-1 rounded-full ${
              sortOption === "Terbesar" ? "bg-blue-100 text-blue-500" : "bg-white text-gray-500 border border-gray-300"
            }`}
            onClick={() => setSortOption("Terbesar")}
          >
            Terbesar
          </button>
        </div>
      </div>
      <div className="overflow-auto max-h-screen">
        {sortedDonations.map((donation, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0">
              <svg
                className="w-full h-full text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-lg font-semibold">{donation.name}</div>
              <div className="text-gray-600">
                Berdonasi sebesar{" "}
                <span className="font-bold">
                  Rp{donation.amount.toLocaleString()}
                </span>
              </div>
              <div className="text-gray-400 text-sm">{donation.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
