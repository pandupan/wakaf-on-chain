import React from "react";

const CardSertificate = () => {
  return (
    <div className="flex justify-center py-10 bg-gray-300">
      <div className="relative w-[800px] h-[600px] bg-gradient-to-r from-secondary to-indigo-500 p-10 text-gray-800 shadow-lg">
        <div className="absolute w-[794px] h-[594px] border-2 border-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-[730px] h-[530px] border-2 border-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative w-[720px] h-[520px] p-0 border border-gray-300 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-center mt-10">
            <h2 className="text-3xl font-bold">
              Sertifikat Wakaf Ponpes Al-Ihsan Tasikmalaya
            </h2>
          </div>

          <div className="mt-6 mx-auto w-[650px]">
            <div className="flex justify-center">
              <div className="border-b border-gray-400 py-2 w-[80%] text-center font-bold">
                Nama pewakif...
              </div>
            </div>

            <div className="text-center mt-5">
              <p className="font-cursive text-lg">
                Telah melaksanakan wakaf
              </p>
              <p className="font-bold text-xl">
                Dalam Rangka kamapaye apa...
              </p>
            </div>

            <div className="text-center mt-5">
              <p className="font-cursive text-lg py-2">
                Atas partisipasi sebagai wakif pada 12 maret 2024, dengan ini telah resmi diterima oleh pihak ponpes dan tercatat dalam blockchain sebagai berikut :
              </p>
              <div className="flex justify-between items-center mt-3">
                <p><strong>etherium address</strong> : 0x6dfe842ff222ff0388c993e</p>
                <p><strong>Wakaf Hash</strong> : 0x7ac053c8efbe9ada9</p>
              </div>
            </div>

          </div>

          <div className="flex justify-between mt-8 mx-16">

            <div className="text-center w-1/2">
              <p className="font-bold">Nama Pewakif</p>
              <div className="border-b border-gray-400 py-2 w-2/3 mx-auto mt-3"></div>
              <p className="font-bold">
                H Dudung Suhendar Spd
              </p>
            </div>

            <div className="text-center w-1/2">
              <p className="font-bold">Penerima Wakaf</p>
              <div className="border-b border-gray-400 py-2 w-2/3 mx-auto mt-3"></div>
              <p className="font-bold">H Aep Surahman Spd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSertificate;
