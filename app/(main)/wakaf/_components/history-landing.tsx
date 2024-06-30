'use client'

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const distribusi = [
  { name: 'Renovasi Sekolah', amount: 1000000, category: 'Pendidikan', date: '2024-06-01' },
  { name: 'Peralatan Rumah Sakit', amount: 500000, category: 'Kesehatan', date: '2024-06-02' },
  { name: 'Pusat Komunitas', amount: 2000000, category: 'Komunitas', date: '2024-06-03' },
  { name: '70 Al-Quran', amount: 700000, category: 'Kitab', date: '2024-06-04' },
  { name: 'Pembangunan Mesjid', amount: 3000000, category: 'Pembangunan', date: '2024-06-05' },
  { name: 'Wakaf Uang Tunai', amount: 1500000, category: 'Wakaf Uang', date: '2024-06-06' },
  { name: 'Beasiswa Siswa', amount: 1200000, category: 'Pendidikan', date: '2024-06-07' },
  { name: 'Perlengkapan Medis', amount: 2500000, category: 'Kesehatan', date: '2024-06-08' },
  { name: 'Pembangunan Jalan', amount: 3200000, category: 'Pembangunan', date: '2024-06-09' },
  { name: 'Perpustakaan Desa', amount: 900000, category: 'Komunitas', date: '2024-06-10' },
  { name: 'Alat Tulis Sekolah', amount: 600000, category: 'Pendidikan', date: '2024-06-11' },
  { name: 'Kursi Roda', amount: 800000, category: 'Kesehatan', date: '2024-06-12' },
  { name: 'Pembangunan Balai Desa', amount: 2700000, category: 'Pembangunan', date: '2024-06-13' },
  { name: 'Buku-buku Pendidikan', amount: 1100000, category: 'Kitab', date: '2024-06-14' },
  { name: 'Wakaf Air Bersih', amount: 2200000, category: 'Wakaf Uang', date: '2024-06-15' },
  { name: 'Penyediaan Makanan Sehat', amount: 1800000, category: 'Kesehatan', date: '2024-06-16' },
  { name: 'Pusat Pelatihan Komunitas', amount: 1500000, category: 'Komunitas', date: '2024-06-17' },
  { name: 'Bantuan Uang Tunai', amount: 1300000, category: 'Wakaf Uang', date: '2024-06-18' },
  { name: 'Pembangunan Taman Bermain', amount: 2600000, category: 'Pembangunan', date: '2024-06-19' },
  { name: 'Seragam Sekolah', amount: 700000, category: 'Pendidikan', date: '2024-06-20' },
  { name: 'Pengadaan Obat-obatan', amount: 900000, category: 'Kesehatan', date: '2024-06-21' },
  { name: 'Pembelian Buku Kitab', amount: 1200000, category: 'Kitab', date: '2024-06-22' },
  { name: 'Renovasi Puskesmas', amount: 3400000, category: 'Kesehatan', date: '2024-06-23' },
  { name: 'Perlengkapan Sekolah', amount: 1000000, category: 'Pendidikan', date: '2024-06-24' },
  { name: 'Pelatihan Keterampilan', amount: 1600000, category: 'Komunitas', date: '2024-06-25' },
  { name: 'Pembangunan Posyandu', amount: 2800000, category: 'Pembangunan', date: '2024-06-26' },
  { name: 'Distribusi Buku Kitab', amount: 800000, category: 'Kitab', date: '2024-06-27' },
  { name: 'Penyediaan Sarana Olahraga', amount: 2100000, category: 'Komunitas', date: '2024-06-28' },
  { name: 'Wakaf untuk Yatim Piatu', amount: 1900000, category: 'Wakaf Uang', date: '2024-06-29' },
  { name: 'Renovasi Asrama', amount: 3000000, category: 'Pendidikan', date: '2024-06-30' },
  { name: 'Penyediaan Vaksin', amount: 2000000, category: 'Kesehatan', date: '2024-07-01' },
  { name: 'Pembelian Perlengkapan Ibadah', amount: 1000000, category: 'Kitab', date: '2024-07-02' },
  { name: 'Bantuan Modal Usaha', amount: 2500000, category: 'Komunitas', date: '2024-07-03' },
  { name: 'Pembangunan Rumah Ibadah', amount: 4000000, category: 'Pembangunan', date: '2024-07-04' },
  { name: 'Pengadaan Buku Kitab', amount: 1500000, category: 'Kitab', date: '2024-07-05' },
  { name: 'Bantuan Dana Kesehatan', amount: 1700000, category: 'Wakaf Uang', date: '2024-07-06' },
  { name: 'Pelatihan Kesehatan', amount: 1400000, category: 'Kesehatan', date: '2024-07-07' },
  { name: 'Pembelian Alat Musik', amount: 1100000, category: 'Komunitas', date: '2024-07-08' },
  { name: 'Renovasi Perpustakaan', amount: 2000000, category: 'Pendidikan', date: '2024-07-09' },
  { name: 'Penyediaan Sarana IT', amount: 3000000, category: 'Pembangunan', date: '2024-07-10' }
];

const HistoryLanding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...Array.from(new Set(distribusi.map(disbursement => disbursement.category)))];

  const filteredDistribusi = distribusi.filter((disbursement) => {
    return (
      (selectedCategory === 'Semua' || disbursement.category === selectedCategory) &&
      disbursement.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary text-center mb-8">
        Penyaluran Wakaf Terbaru
      </h1>
      <div className="mb-8 flex flex-col md:flex-row md:justify-center md:space-x-4">
        <div className="flex items-center mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Cari..."
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-gray-500 ml-2" />
        </div>
        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white overflow-hidden">
        <table className="min-w-full bg-transparent table-auto border-separate border-spacing-y-2">
          <thead className="bg-gradient-to-r from-secondary to-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-center text-sm sm:text-base rounded-l-lg">Tanggal</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base">Nama Benda</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base">Jumlah Nominal</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base rounded-r-lg">Kategori</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredDistribusi.map((disbursement, index) => (
              <tr
                key={index}
                className="transform transition duration-500 hover:scale-105 bg-gray-50 hover:bg-gray-100 rounded-lg"
              >
                <td className="py-3 px-4 text-center sm:text-base text-sm">{formatDate(disbursement.date)}</td>
                <td className="py-3 px-4 text-center sm:text-base text-sm">{disbursement.name}</td>
                <td className="py-3 px-4 text-center sm:text-base text-sm">{`Rp ${disbursement.amount.toLocaleString()}`}</td>
                <td className="py-3 px-4 text-center sm:text-base text-sm rounded-r-lg">{disbursement.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLanding;
