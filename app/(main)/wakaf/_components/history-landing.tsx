'use client'

import { FaHandHoldingUsd } from 'react-icons/fa';

const HistoryLanding = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center space-y-4 sm:space-y-8 mt-10">
      <h1 className="sm:text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
        Penyaluran Wakaf Terbaru
      </h1>
      <p className="md:text-center xl:text-lg text-justify max-w-5xl mx-auto">
        Memberikan gambaran penyaluran wakaf dalam 30 hari terakhir serta transparansi dalam penyaluran dana dan anggaran wakaf di lingkungan Pondok Pesantren Mahasiswa Al-Ihsan tasikmalaya.
      </p>
      <div className="pt-4">
        <ol className="relative border-s border-gray-200 max-w-5xl mx-auto">
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-secondary rounded-full -start-3 ring-8 ring-white">
              <FaHandHoldingUsd className="text-secondary-foreground text-xs" />
            </span>
            <span className="bg-secondary/10 text-secondary text-sm font-medium me-2 px-2.5 py-0.5 rounded">
              Pencairan ke-1: <b>Rp9.000.000</b>
            </span>
            <h3 className="flex items-center gap-2 my-1 text-lg font-bold text-gray-900 max-w-2xl">
              Wakaf untuk membantu membangun rumah orang tua santri PPM Al Ihsan Tasikmalaya
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
              Rabu, 20 Juni 2024 20:46
            </time>
            <p className="mb-4 text-base font-normal text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore recusandae nostrum magni corrupti consectetur autem, ab molestias, ea alias officia veritatis? Quas delectus officia tempore blanditiis nulla nostrum reprehenderit praesentium!
            </p>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-secondary rounded-full -start-3 ring-8 ring-white">
              <FaHandHoldingUsd className="text-secondary-foreground text-xs" />
            </span>
            <span className="bg-secondary/10 text-secondary text-sm font-medium me-2 px-2.5 py-0.5 rounded">
              Pencairan ke-2: <b>Rp15.000.000</b>
            </span>
            <h3 className="flex items-center gap-2 my-1 text-lg font-bold text-gray-900 max-w-2xl">
              Wakaf untuk membantu pakaian korban bencana tasikmalaya
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
              Rabu, 20 Juni 2024 20:46
            </time>
            <p className="mb-4 text-base font-normal text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore recusandae nostrum magni corrupti consectetur autem, ab molestias, ea alias officia veritatis? Quas delectus officia tempore blanditiis nulla nostrum reprehenderit praesentium!
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HistoryLanding;
