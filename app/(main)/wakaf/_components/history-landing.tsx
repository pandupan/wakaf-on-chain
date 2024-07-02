'use client'

import React from 'react';

const distribusi = [
  { name: 'Renovasi Sekolah', amount: 1000000, category: 'Pendidikan', date: '2024-06-01' },
  { name: 'Peralatan Rumah Sakit', amount: 500000, category: 'Kesehatan', date: '2024-06-02' },
  { name: 'Pusat Komunitas', amount: 2000000, category: 'Komunitas', date: '2024-06-03' },
  { name: '70 Al-Quran', amount: 700000, category: 'Kitab', date: '2024-06-04' },
  { name: 'Pembangunan Mesjid', amount: 3000000, category: 'Pembangunan', date: '2024-06-05' },
  { name: 'Wakaf Uang Tunai', amount: 1500000, category: 'Wakaf Uang', date: '2024-06-06' },
  { name: 'Beasiswa Siswa', amount: 1200000, category: 'Pendidikan', date: '2024-06-07' },
  { name: 'Perlengkapan Medis', amount: 2500000, category: 'Kesehatan', date: '2024-06-08' },
];

const HistoryLanding = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col justify-center space-y-4 sm:space-y-8 mt-10">
      <h1 className="text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
        Penyaluran Wakaf Terbaru
      </h1>
      <p className="md:text-center xl:text-lg text-justify max-w-5xl mx-auto">
        Memberikan gambaran penyaluran wakf dalam 30 hari terakhir serta transparansi dalam penyaluran dana dan anggaran wakaf di lingkungan Pondok Pesantren Mahasiswa Al-Ihsan tasikmalaya.
      </p>
      <div className="bg-white">
        <table className="min-w-full bg-transparent table-auto border-separate border-spacing-y-2">
          <thead className="bg-gradient-to-r from-secondary to-blue-500 text-white">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-base rounded-l-lg">Tanggal</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-base">Nama Benda</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-base">Jumlah Nominal</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-base rounded-r-lg">Kategori</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {distribusi.map((disbursement, index) => (
              <tr
                key={index}
                className="transform transition duration-500 hover:scale-[1.02] bg-gray-50 hover:bg-gray-100"
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4 sm:text-base text-xs rounded-l-lg">{disbursement.date}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 sm:text-base text-xs">{disbursement.name}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-right sm:text-base text-xs">{`Rp ${disbursement.amount.toLocaleString()}`}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 sm:text-base text-xs rounded-r-lg">{disbursement.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLanding;
