import React from "react";
import Image from "next/image";
import bedIcon from "/public/images/icons/bed.png";
import homeIcon from "/public/images/icons/home.png";
import officeBuildingIcon from "/public/images/icons/office-building.png";
import parkingIcon from "/public/images/icons/parking.png";
import mosqueIcon from "/public/images/icons/mosque.png";

const Facilities = () => {
  return (
    <div id="fasilitas">
      <div className="absolute -left-10 z-0">
        <div className="relative aspect-square w-[270px] h-[610px] z-0">
          <Image
            src="/images/bg-vector-3-3.png"
            alt="bg-vector"
            fill={true}
          />
        </div>
      </div>
      <div className="relative container flex flex-col py-8 overflow-hidden">
        <div className="text-center mt-10 pb-4">
          <h3 className="text-foreground font-bold text-sm">
            Pondok Pesantren Mahasiswa Al-Ihsan Tasikmalaya
          </h3>
          <h1 className="text-secondary text-3xl sm:text-5xl xl:text-6xl font-bold">
            Fasilitas Terbaik
          </h1>
        </div>
        <p className="text-center max-w-3xl place-self-center sm:text-base text-sm">
          Pesantren kami berdiri di atas lahan seluas <b>1773m<sup>2</sup></b> dengan
          luas bangunan <b>1232m<sup>2</sup></b>, dan menyediakan berbagai fasilitas untuk
          menunjang kegiatan para santri.
        </p>
        <div className="w-full grid grid-cols-12 gap-2 sm:gap-4 mt-12">
          <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden col-span-12 sm:col-span-7 sm:row-span-2">
            <Image
              src="/images/Gallery1.png"
              alt="Gallery image 1"
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="relative w-full aspect-video sm:aspect-auto h-full col-span-12 sm:col-span-5 rounded-lg overflow-hidden">
            <Image
              src="/images/Gallery2.png"
              alt="Gallery image 2"
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="relative w-full aspect-video sm:aspect-auto h-full col-span-12 sm:col-span-5 rounded-lg overflow-hidden">
            <Image
              src="/images/Gallery3.png"
              alt="Gallery image 3"
              fill={true}
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 py-10">
          <div className="mb-8 space-y-3">
            <h2 className="text-secondary text-3xl sm:text-5xl xl:text-6xl font-bold text-center">
              Fasilitas Tersedia
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-center">
              Kami menyediakan berbagai fasilitas untuk mendukung kenyamanan dan kebutuhan para santri, termasuk kamar tidur, aula, toilet, dapur, parkiran, dan masjid.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800">
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={bedIcon} alt="Bed Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">10</span>
                Kamar Tidur Laki-laki
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={bedIcon} alt="Bed Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">10</span>
                Kamar Tidur Perempuan
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={homeIcon} alt="Home Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">3</span>
                Kamar Guru Pondok
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src="/images/icons/town-hall.png" alt="Hall Icon" width={30} height={30} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">1</span>
                Aula
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/toilet-.png" alt="Toilet" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">8</span>
                Toilet Laki-laki
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/toilet-.png" alt="Toilet" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">13</span>
                Toilet Perempuan
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/kitchen.png" alt="Dapur" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">2</span>
                Dapur
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={parkingIcon} alt="Parking Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">2</span>
                Parkiran
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={officeBuildingIcon} alt="Office Building Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">1</span>
                Kantor
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/guard.png" alt="Toilet" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">1</span>
                Kantor Penjagaan
              </div>
            </div>
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={mosqueIcon} alt="Mosque Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">1</span>
                Masjid
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
