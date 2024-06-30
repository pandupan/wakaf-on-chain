import React from 'react';

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
      <p className="md:text-center mb-8 xl:text-lg text-sm text-justify ">
        Ini dibuat untuk memberikan apresiasi kepada para wakif yang telah berkontribusi dalam periode terbaru. 
        Kami menghargai setiap sumbangan yang diberikan dan berharap dapat terus mendorong lebih banyak orang untuk berpartisipasi 
        dalam kegiatan wakaf yang berkelanjutan.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {sortedWakifList.map((wakif, index) => (
          <div 
            key={index} 
            className="relative bg-gradient-to-r from-blue-50 to-blue-100 shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 sm:aspect-square text-black"
          >
            <div className={`absolute top-0 left-0 p-2 rounded-br-lg xl:text-lg sm:text-base text-xs font-bold text-white 
            ${index === 0 ? 'bg-[#ffd700]' : index === 1 ? 'bg-[#c0c0c0]' : index === 2 ? 'bg-[#cd7f32]' : 'bg-primary'}`}>
              {`Top ${index + 1}`}
            </div>
            <div className="flex flex-col items-center justify-center h-full p-4">
              <h3 className="text-2xl font-semibold sm:mb-2">{wakif.name}</h3>
              <p className="absolute bottom-1 sm:bottom-2 right-2 text-sm text-gray-600">{wakif.date}</p>
              <p className="text-gray-600">{`Jumlah Wakaf: Rp ${wakif.amount.toLocaleString()}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWakifGrid;
