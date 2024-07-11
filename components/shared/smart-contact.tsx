import React from "react";
import Image from "next/image";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

const SuratPernyataan = () => {
  return (
    <div className={`${merriweather.className} w-full py-8 px-4 bg-gray-100`}>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="relative mb-8 px-16 pt-4">
          <Image
            src="/images/kop-surat.png"
            alt="Kop Surat"
            width={800}
            height={150}
            layout="responsive"
            className="border-b-2 border-black"
          />
        </div>
        <div className="px-8">
          <h1 className="text-lg text-semibold text-center underline underline-offset-4 mb-3">
            SURAT PERNYATAAN
          </h1>
          <h2 className="text-base text-center py-2">
            DONASI WAKAF UANG UNTUK PONDOK PESANTREN MAHASISWA AL-IHSAN
          </h2>
          <div className="px-8 text-sm">
            <div className="space-y-1">
              <p className="text-sm text-center mt-4">
                Yang bertanda tangan di bawah ini kami wakif dan penerima wakaf
                menerangkan bahwa:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <div className="flex justify-between">
                  <span>Nama Para/Ahli Waris</span>
                  <span>:</span>
                </div>
                <div className="md:col-span-2">
                  <span></span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <div className="flex justify-between">
                  <span>Umur</span>
                  <span>:</span>
                </div>
                <div className="md:col-span-2">
                  <span></span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <div className="flex justify-between">
                  <span>Pekerjaan</span>
                  <span>:</span>
                </div>
                <div className="md:col-span-2">
                  <span></span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <div className="flex justify-between">
                  <span>Alamat</span>
                  <span>:</span>
                </div>
                <div className="md:col-span-2">
                  <span></span>
                </div>
              </div>
            </div>
            <p className="italic my-4">
              (Selaku Pewakaf/wakif yang selanjutnya disebut pihak ke-I)
            </p>
            <div className="space-y-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <div className="flex justify-between">
                  <span>Nama</span>
                  <span>:</span>
                </div>
                <div className="md:col-span-2">
                  <span></span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <div className="flex justify-between">
                  <span>Umur</span>
                  <span>:</span>
                </div>
                <div className="md:col-span-2">
                  <span></span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <div className="flex justify-between">
                  <span>Pekerjaan</span>
                  <span>:</span>
                </div>
                <div className="md:col-span-2">
                  <span></span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                <div className="flex justify-between">
                  <span>Alamat</span>
                  <span>:</span>
                </div>
                <div className="md:col-span-2">
                  <span></span>
                </div>
              </div>
            </div>
            <p className="italic my-4">
              (Selaku Penerima Wakaf yang selanjutnya disebut pihak ke-II)
            </p>
            <p className="mb-4 text-justify indent-6">
              Dengan ini menyatakan bahwa pihak ke
              satu telah sepakat menyerahkan/mewakafkan uang senilai <span>.....</span> pada
              tanggal <span>.....</span> untuk kepentingan pembangunan <span>.....</span> Pondok
              Pesantren Mahasiswa Al-Ihsan yang terletak di Jl. R.E. Martadinata
              Panyingkiran No.224 Cipedes Kota Tasikamalaya kepada pihak ke dua
              berikut dokumen administrasinya.
            </p>
            <p className="mb-8 text-justify indent-6">
              Demikian surat pernyataan ini dibuat dengan sebenarnya dan untuk
              dipergunakan sebagaimana mestinya.
            </p>
          </div>
          <div className="flex justify-between mt-8 mb-10 gap-10 text-sm">
            <div className="text-center w-1/2">
              <p>Yang menerima Wakaf</p>
              <p>Pihak Kedua</p>

              <p className="my-8 py-12">Nama Pihak Kedua</p>
            </div>
            <div className="text-center w-1/2">
              <p>Yang menyatakan Wakaf/Wakif</p>
              <p>Pihak Kesatu</p>

              <p className="my-8 py-12">Nama Pihak Pertama</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratPernyataan;
