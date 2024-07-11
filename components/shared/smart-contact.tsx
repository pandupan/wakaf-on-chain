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
        <div className="relative mb-8">
          <Image
            src="/images/kop-surat.png"
            alt="Kop Surat"
            width={800}
            height={150}
            layout="responsive"
          />
        </div>
        <h1 className="text-xl text-center underline underline-offset-4">
          SURAT PERNYATAAN
        </h1>
        <h2 className="text-lg text-center py-3">
          DONASI WAKAF UANG UNTUK PONDOK PESANTREN MAHASISWA AL-IHSAN
        </h2>
        <div className="px-8">
          <p className="mb-4">
            Yang bertanda tangan di bawah ini kami wakif dan penerima wakaf
            menerangkan bahwa:
          </p>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Nama Para/Ahli Waris:</h3>
            <p>Umur :</p>
            <p>Pekerjaan :</p>
            <p>Alamat :</p>
            <p className="italic">
              (Selaku Pewakaf/wakif yang selanjutnya disebut pihak ke-I)
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Nama:</h3>
            <p>Umur :</p>
            <p>Pekerjaan :</p>
            <p>Alamat :</p>
            <p className="italic">
              (Selaku Penerima Wakaf yang selanjutnya disebut pihak ke-II)
            </p>
          </div>
          <p className="mb-4 text-justify">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dengan ini menyatakan bahwa pihak ke
            satu telah sepakat menyerahkan/mewakafkan uang senilai ..... pada
            tanggal ...... untuk kepentingan pembangunan ...... Pondok Pesantren
            Mahasiswa Al-Ihsan yang terletak di Jl. R.E. Martadinata
            Panyingkiran No.224 Cipedes Kota Tasikamalaya kepada pihak ke dua
            berikut dokumen administrasinya.
          </p>
          <p className="mb-8 text-justify">
            Demikian surat pernyataan ini dibuat dengan sebenarnya dan untuk
            dipergunakan sebagaimana mestinya.
          </p>
        </div>
        <div className="flex justify-between mt-8 gap-10">
          <div className="text-center w-1/2">
            <p>Yang menerima Wakaf</p>
            <p>Pihak Kedua</p>

            <p className="my-8 py-8">Nama Pihak Kedua</p>
          </div>
          <div className="text-center w-1/2">
            <p>Yang menyatakan Wakaf/Wakif</p>
            <p>Pihak Kesatu</p>

            <p className="my-8 py-8">Nama Pihak Pertama</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratPernyataan;
