'use client'

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from '@/components/ui/card';

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
        Memberikan gambaran penyaluran wakaf dalam 30 hari terakhir serta transparansi dalam penyaluran dana dan anggaran wakaf di lingkungan Pondok Pesantren Mahasiswa Al-Ihsan tasikmalaya.
      </p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Tanggal</TableHead>
              <TableHead>Nama Benda</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Jumlah Nominal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {distribusi.map((disbursement) => (
              <TableRow key={disbursement.date}>
                <TableCell className="font-medium">{disbursement.date}</TableCell>
                <TableCell>{disbursement.name}</TableCell>
                <TableCell>{disbursement.category}</TableCell>
                <TableCell className="text-right">{`Rp ${disbursement.amount.toLocaleString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{`Rp ${distribusi.reduce((sum, { amount }) => sum + amount, 0).toLocaleString()}`}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default HistoryLanding;
