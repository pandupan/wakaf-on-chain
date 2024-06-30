'use client'

import React, { useState } from 'react';
import WakafForm from './wakaf-form'; // Impor komponen form yang sudah Anda buat

const WakafTable = () => {
  // Mock data, nantinya data ini bisa diambil dari API atau state management
  const [wakafData, setWakafData] = useState([
    {
      nama_donatur: 'John Doe',
      nomor_identitas: '123456789',
      alamat_donatur: 'Jl. Kebon Jeruk',
      nomor_telepon: '08123456789',
      email_donatur: 'john@example.com',
      jenis_wakaf: 'Tanah',
      nilai_wakaf: '100000000',
      deskripsi_wakaf: 'Wakaf tanah untuk pembangunan masjid',
      lokasi_wakaf: 'Jl. Merdeka',
      tujuan_wakaf: 'Pembangunan masjid',
      tanggal_wakaf: '2023-06-01',
      metode_pembayaran: 'Transfer Bank',
      bukti_pembayaran: 'bukti_transfer.jpg',
      nama_nadzir: 'Ustadz Ahmad',
      kontak_nadzir: '082123456789',
      alamat_nadzir: 'Jl. Kebon Kacang',
      catatan_tambahan: 'Wakaf ini merupakan amanah dari keluarga',
      dokumen_pendukung: 'dokumen_pendukung.pdf',
    },


    // Data tambahan dapat ditambahkan di sini
  ]);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="w-full mx-auto p-8 bg-white shadow-md rounded space-y-8">
      <h2 className="text-2xl font-bold mb-6">Daftar Wakaf</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className='text-center'>
              <th scope="col" className="px-6 py-3">Nama Donatur</th>
              <th scope="col" className="px-6 py-3">Nomor Identitas</th>
              <th scope="col" className="px-6 py-3">Alamat Donatur</th>
              <th scope="col" className="px-6 py-3">Nomor Telepon</th>
              <th scope="col" className="px-6 py-3">Email Donatur</th>
              <th scope="col" className="px-6 py-3">Jenis Wakaf</th>
              <th scope="col" className="px-6 py-3">Nilai Wakaf</th>
              <th scope="col" className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {wakafData.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700 text-center">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.nama_donatur}
                  </th>
                  <td className="px-6 py-4">{item.nomor_identitas}</td>
                  <td className="px-6 py-4">{item.alamat_donatur}</td>
                  <td className="px-6 py-4">{item.nomor_telepon}</td>
                  <td className="px-6 py-4">{item.email_donatur}</td>
                  <td className="px-6 py-4">{item.jenis_wakaf}</td>
                  <td className="px-6 py-4">{item.nilai_wakaf}</td>
                  <td className="px-6 py-4 flex flex-row space-x-2 text-white justify-center">
                    <button onClick={() => toggleRow(index)} className="bg-blue-500 hover:bg-blue-700 rounded-sm p-2">
                      {expandedRow === index ? 'Tutup' : 'Lihat'}
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 rounded-sm p-2">Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 rounded-sm p-2">Hapus</button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                    <td colSpan={8} className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-xl font-bold">Detail Wakaf</h1>
                          <p><strong>Deskripsi Wakaf:</strong> {item.deskripsi_wakaf}</p>
                          <p><strong>Lokasi Wakaf:</strong> {item.lokasi_wakaf}</p>
                          <p><strong>Tujuan Wakaf:</strong> {item.tujuan_wakaf}</p>
                          <p><strong>Tanggal Wakaf:</strong> {item.tanggal_wakaf}</p>
                          <p><strong>Metode Pembayaran:</strong> {item.metode_pembayaran}</p>
                          <p><strong>Bukti Pembayaran:</strong> {item.bukti_pembayaran}</p>
                        </div>
                        <div>
                          <h1 className="text-xl font-bold">Detail Nadzir</h1>
                          <p><strong>Nama Nadzir:</strong> {item.nama_nadzir}</p>
                          <p><strong>Kontak Nadzir:</strong> {item.kontak_nadzir}</p>
                          <p><strong>Alamat Nadzir:</strong> {item.alamat_nadzir}</p>
                          <p><strong>Catatan Tambahan:</strong> {item.catatan_tambahan}</p>
                          <p><strong>Dokumen Pendukung:</strong> {item.dokumen_pendukung}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WakafTable;
