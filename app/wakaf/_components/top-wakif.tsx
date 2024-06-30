import React from 'react';
import { FaCrown, FaMedal } from 'react-icons/fa';

const wakifList = [
  { name: 'Ahmad Abdullah', date: '2024-06-01', amount: 1000000 },
  { name: 'Fatimah Ibrahim', date: '2024-06-02', amount: 500000 },
  { name: 'Yusuf Ali', date: '2024-06-03', amount: 2000000 },
  { name: 'Aisha Rahman', date: '2024-06-04', amount: 750000 },
  { name: 'Khalid Hassan', date: '2024-06-05', amount: 1500000 },
  { name: 'Noura Saleh', date: '2024-06-06', amount: 1250000 },
  { name: 'Kareem Mustafa', date: '2024-06-07', amount: 1750000 },
  { name: 'Layla Bakr', date: '2024-06-08', amount: 3000000 },
  { name: 'Omar Khattab', date: '2024-06-09', amount: 1100000 },
  { name: 'Salma Ahmad', date: '2024-06-10', amount: 800000 },
];

const sortedWakifList = wakifList.sort((a, b) => b.amount - a.amount);

const TopWakifGrid = () => {
  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary text-center mb-8">
        Top 10 Terbaru Wakif
      </h1>
      <p className="md:text-center mb-8 xl:text-lg text-sm text-justify lg:mx-40">
        Ini dibuat untuk memberikan apresiasi kepada para wakif yang telah berkontribusi dalam periode terbaru. 
        Kami menghargai setiap sumbangan yang diberikan dan berharap dapat terus mendorong lebih banyak orang untuk berpartisipasi 
        dalam kegiatan wakaf yang berkelanjutan.
      </p>
      <div className="bg-white overflow-hidden">
        <table className="min-w-full bg-transparent table-auto border-separate border-spacing-y-2">
          <thead className="bg-gradient-to-r from-secondary to-indigo-500 text-white">
            <tr>
              <th className="py-3 px-4 text-center text-sm sm:text-base">Top</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base">Nama</th>
              <th className="py-3 px-4 text-center text-sm sm:text-base">Jumlah Wakaf</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sortedWakifList.map((wakif, index) => (
              <tr 
                key={index} 
                className={`transform transition duration-500 hover:scale-105 ${index === 0 ? "bg-yellow-100 hover:bg-yellow-200" : index === 1 ? "bg-gray-100 hover:bg-gray-200" : index === 2 ? "bg-orange-100 hover:bg-orange-200" : "bg-transparent hover:bg-gray-50"} rounded-lg`}
              >
                <td className="py-3 px-4 text-center sm:text-base text-sm">
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
                <td className="py-3 px-4 text-center sm:text-base text-sm">{`Rp ${wakif.amount.toLocaleString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopWakifGrid;
