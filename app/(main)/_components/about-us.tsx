import React from "react";
import Image from "next/image";
import scrollIcon from "/public/images/icons/scroll.png";
import placeholderIcon from "/public/images/icons/placeholder.png";
import bookIcon from "/public/images/icons/book.png";
import groupIcon from "/public/images/icons/group.png";

const AboutUs = () => {
  return (
    <section id="about" className="relative py-12 bg-white">
      <div className="absolute -top-32 -right-10 z-0">
        <div className="relative aspect-square w-[270px] h-[610px] z-0">
          <Image
            src="/images/bg-vector-3-3.png"
            alt="bg-vector"
            fill={true}
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      </div>
      <div className="relative container flex flex-col lg:flex-row items-center gap-10 sm:gap-16">
        <div className="relative flex-1 w-full aspect-[4/3] rounded-md overflow-hidden">
          <Image
            src="/images/mosque2.png"
            alt="Mosque Image"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="space-y-6 max-w-lg lg:max-w-none flex-1">
          <div className="text-center lg:text-left">
            <h3 className="text-sm font-bold text-black">
              Pondok Pesantren Mahasiswa
            </h3>
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
              Al-Ihsan Tasikmalaya
            </h1>
          </div>
          <div className="mt-6 space-y-4 text-foreground">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={scrollIcon} alt="Scroll Icon" width={32} height={32} />
              </div>
              <p className="text-sm sm:text-base">
                Pondok Pesantren Mahasiswa Al-Ihsan Tasikmalaya didirikan pada
                tahun 2019 sebagai pusat pendidikan Islam yang menerima
                mahasiswa dari berbagai program studi dan kampus di Tasikmalaya.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={placeholderIcon} alt="Placeholder Icon" width={32} height={32} />
              </div>
              <p className="text-sm sm:text-base">
                Berlokasi di Jl. R.E. Martadinata Panyingkiran No.224, Cipedes,
                pondok ini menawarkan pendidikan tanpa biaya untuk para santri
                dan wali.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={bookIcon} alt="Book Icon" width={32} height={32} />
              </div>
              <p className="text-sm sm:text-base">
                Pondok Pesantren Mahasiswa Al-Ihsan mengintegrasikan pendidikan
                agama seperti kajian kitab dan tahfidz quran dengan pendidikan
                umum serta pengembangan softskill dan hardskill.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={groupIcon} alt="Group Icon" width={32} height={32} />
              </div>
              <p className="text-sm sm:text-base">
                Saat ini, pondok ini memiliki 97 santri yang terdiri dari 37
                putra dan 60 putri, yang semuanya terlibat aktif dalam berbagai
                kegiatan pondok.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
