'use client'

import React from 'react';
import { useState } from 'react';
const WakafForm = () => {
  const [formData, setFormData] = useState({
    nama_donatur: '',
    nomor_identitas: '',
    alamat_donatur: '',
    nomor_telepon: '',
    email_donatur: '',
    jenis_wakaf: '',
    nilai_wakaf: '',
    deskripsi_wakaf: '',
    lokasi_wakaf: '',
    tujuan_wakaf: '',
    tanggal_wakaf: '',
    metode_pembayaran: '',
    bukti_pembayaran: null,
    nama_nadzir: '',
    kontak_nadzir: '',
    alamat_nadzir: '',
    catatan_tambahan: '',
    dokumen_pendukung: null,
  });

  const handleChange = (e:any) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formData);
    // Implementasi penyimpanan data
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-8 bg-white shadow-md rounded space-y-8">
      <h2 className="text-2xl font-bold mb-6">Form Pencatatan Wakaf</h2>

      {/* Bagian Donatur */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Data Donatur</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nama Donatur</label>
            <input
              type="text"
              name="nama_donatur"
              value={formData.nama_donatur}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nomor Identitas</label>
            <input
              type="text"
              name="nomor_identitas"
              value={formData.nomor_identitas}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Alamat Donatur</label>
            <input
              type="text"
              name="alamat_donatur"
              value={formData.alamat_donatur}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input
              type="text"
              name="nomor_telepon"
              value={formData.nomor_telepon}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Donatur</label>
            <input
              type="email"
              name="email_donatur"
              value={formData.email_donatur}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
            />
          </div>
        </div>
      </div>

      {/* Bagian Wakaf */}
      <div className='border-t-2 border-gray-300 w-full'/>
      <div>
        <h3 className="text-xl font-semibold mb-4">Data Wakaf</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Jenis Wakaf</label>
            <input
              type="text"
              name="jenis_wakaf"
              value={formData.jenis_wakaf}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nilai Wakaf</label>
            <input
              type="number"
              name="nilai_wakaf"
              value={formData.nilai_wakaf}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Deskripsi Wakaf</label>
            <textarea
              name="deskripsi_wakaf"
              value={formData.deskripsi_wakaf}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              rows= {3}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Lokasi Wakaf</label>
            <input
              type="text"
              name="lokasi_wakaf"
              value={formData.lokasi_wakaf}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tujuan Wakaf</label>
            <input
              type="text"
              name="tujuan_wakaf"
              value={formData.tujuan_wakaf}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tanggal Wakaf</label>
            <input
              type="date"
              name="tanggal_wakaf"
              value={formData.tanggal_wakaf}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Metode Pembayaran</label>
            <input
              type="text"
              name="metode_pembayaran"
              value={formData.metode_pembayaran}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
              required
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bukti Pembayaran</label>
            <input
              type="file"
              name="bukti_pembayaran"
              onChange={handleChange}
              className="mt-1 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
            />
          </div>
        </div>
      </div>

      {/* Bagian Nadzir */}
      <div className='border-t-2 border-gray-300 w-full'/>
      <div>
        <h3 className="text-xl font-semibold mb-4">Data Nadzir</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nama Nadzir</label>
            <input
              type="text"
              name="nama_nadzir"
              value={formData.nama_nadzir}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Kontak Nadzir</label>
            <input
              type="text"
              name="kontak_nadzir"
              value={formData.kontak_nadzir}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Alamat Nadzir</label>
            <input
              type="text"
              name="alamat_nadzir"
              value={formData.alamat_nadzir}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Catatan Tambahan</label>
            <textarea
              name="catatan_tambahan"
              value={formData.catatan_tambahan}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              rows={3}
            ></textarea>
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Dokumen Pendukung</label>
            <input
              type="file"
              name="dokumen_pendukung"
              onChange={handleChange}
              className="mt-1 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white sm:text-sm"
      >
        Submit
      </button>
    </form>
  );
};

export default WakafForm;
