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
    <section id="pengurus-pondok" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mt-10 pb-4">
          <h1 className="text-secondary text-3xl sm:text-5xl xl:text-6xl font-bold">
            Pengurus Pondok
          </h1>
          <h3 className="text-secondary font-bold text-2xl mt-2">
            Pesantren Mahasiswa Al-Ihsan Tasikmalaya
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Para pengurus pondok adalah orang-orang yang berkomitmen untuk memberikan yang terbaik dalam mendukung pendidikan dan kehidupan santri di Pesantren Mahasiswa Al-Ihsan Tasikmalaya.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {pengurusData.map((pengurus, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <div className="relative w-full h-64">
                <Image
                  src={pengurus.imageSrc}
                  alt={`Foto ${pengurus.nama}`}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800">{pengurus.nama}</h3>
                <p className="text-gray-600 mt-2">{pengurus.jabatan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PengurusPondok;
