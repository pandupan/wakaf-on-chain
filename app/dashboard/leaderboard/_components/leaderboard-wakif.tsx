import React from 'react';
import { FaCrown, FaMedal } from 'react-icons/fa';

const wakifList = [
  { name: 'Ahmad Abdullah', totalAmount: 1000000, donationFrequency: 2, largestDonation: 500000 },
  { name: 'Fatimah Ibrahim', totalAmount: 500000, donationFrequency: 1, largestDonation: 500000 },
  { name: 'Yusuf Ali', totalAmount: 2000000, donationFrequency: 3, largestDonation: 1000000 },
  { name: 'Aisha Rahman', totalAmount: 750000, donationFrequency: 1, largestDonation: 750000 },
  { name: 'Khalid Hassan', totalAmount: 1500000, donationFrequency: 2, largestDonation: 1000000 },
  { name: 'Noura Saleh', totalAmount: 1250000, donationFrequency: 2, largestDonation: 750000 },
  { name: 'Kareem Mustafa', totalAmount: 1750000, donationFrequency: 2, largestDonation: 1000000 },
  { name: 'Layla Bakr', totalAmount: 3000000, donationFrequency: 1, largestDonation: 3000000 },
  { name: 'Omar Khattab', totalAmount: 1100000, donationFrequency: 1, largestDonation: 1100000 },
  { name: 'Salma Ahmad', totalAmount: 800000, donationFrequency: 1, largestDonation: 800000 },
];

const sortedWakifList = wakifList.sort((a, b) => b.totalAmount - a.totalAmount);

const LeaderboardWakif = () => {
  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary text-center mb-8">
        Papan Peringkat Wakif
      </h1>
      <p className="md:text-center mb-8 xl:text-lg text-justify max-w-4xl mx-auto">
        Halaman ini menampilkan daftar wakif dengan total kontribusi terbesar. Informasi ini membantu kami dalam memonitor
        dan mengapresiasi kontribusi para wakif. Pastikan data ini selalu diperbarui dan digunakan untuk mengidentifikasi
        peluang pengembangan lebih lanjut dalam program wakaf.
      </p>
      <div>
        <table className="min-w-full bg-transparent table-auto border-separate border-spacing-y-2">
          <thead className="bg-gradient-to-r from-secondary to-indigo-500 text-white">
            <tr>
              <th className="py-3 px-4 text-center text-sm sm:text-base rounded-l-lg">Top</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base">Nama</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base">Frekuensi Donasi</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base">Donasi Terbesar</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base rounded-r-lg">Total Wakaf</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sortedWakifList.map((wakif, index) => (
              <tr
                key={index}
                className={`transform transition duration-500 hover:scale-[1.02] ${index === 0 ? "bg-yellow-100 hover:bg-yellow-200" : index === 1 ? "bg-gray-200 hover:bg-gray-300" : index === 2 ? "bg-orange-100 hover:bg-orange-200" : "bg-gray-50 hover:bg-gray-100"} rounded-lg`}
              >
                <td className="py-3 px-4 rounded-l-lg text-center sm:text-base text-sm">
                  <div className="flex items-center justify-center">
                    {index === 0 ? <FaCrown className="text-yellow-500 text-lg sm:text-2xl" /> : <FaMedal className={index === 1 ? "text-gray-400 text-lg sm:text-2xl" : index === 2 ? "text-orange-500 text-lg sm:text-2xl" : "text-gray-300 text-lg sm:text-2xl"} />}
                    <span className={`text-lg font-bold ml-2 ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : index === 2 ? "text-orange-500" : ""}`}>
                      {`${index + 1}`}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center sm:text-base text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <span>{wakif.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center sm:text-base text-sm">{wakif.donationFrequency}</td>
                <td className="py-3 px-4 text-center sm:text-base text-sm">{`Rp ${wakif.largestDonation.toLocaleString()}`}</td>
                <td className="py-3 px-4 rounded-r-lg text-center sm:text-base text-sm">{`Rp ${wakif.totalAmount.toLocaleString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardWakif;
