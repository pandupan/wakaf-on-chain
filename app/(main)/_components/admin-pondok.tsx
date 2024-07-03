// components/PengurusPondok.js
import React from 'react';
import Image from 'next/image';

const pengurusData = [
  {
    nama: 'HASANURIP, S.KOM, M.M',
    jabatan: 'KETUA',
    imageSrc: '/images/pengurus4.jpg',
  },
  {
    nama: 'DEZA ADYTIAR NUR ARIEF',
    jabatan: 'SEKRETARIS',
    imageSrc: '/images/pengurus5.jpg',
  },
  {
    nama: 'DRS. H. SUKISNO, MPSA',
    jabatan: 'BENDAHARA UMUM',
    imageSrc: '/images/pengurus6.jpg',
  },
  {
    nama: 'TYARA AHSANU GHINA',
    jabatan: 'BENDAHARA',
    imageSrc: '/images/pengurus7.jpg',
  },
];

const PengurusPondok = () => {
  return (
    <section id="pengurus-pondok" className="py-4 sm:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mt-10 pb-4">
          <h1 className="text-secondary text-3xl sm:text-5xl xl:text-6xl font-bold">
            Pengurus Pondok
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Para pengurus pondok adalah orang-orang yang berkomitmen untuk memberikan yang terbaik dalam mendukung pendidikan dan kehidupan santri di Pesantren Mahasiswa Al-Ihsan Tasikmalaya.
          </p>
        </div>
        <ul className="w-full flex flex-wrap justify-center gap-x-10 gap-y-2 mt-4 sm:mt-12">
          {
            pengurusData.map((item, idx) => (
              <li key={idx} className="p-4 space-y-4 flex-1">
                <div className="w-24 aspect-square mx-auto">
                  <img
                    src="https://picsum.photos/id/83/900/450"
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-gray-700 font-semibold sm:text-lg whitespace-nowrap">{item.nama}</h4>
                  <p className="text-secondary">{item.jabatan}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
};

export default PengurusPondok;
