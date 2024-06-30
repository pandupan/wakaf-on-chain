import Image from "next/image";
import React from "react";

const WhatIsWakaf = () => {
  return (
    <section id="what-is-wakaf" className="py-10 sm:py-20 relative">
      <div className="container relative z-[1]">
        {/* Header */}
        <div className="text-center mb-12 max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
            Apa Itu Wakaf?
          </h1>
          <p className="mt-4 sm:text-lg text-gray-600 sm:mx-10">
            Wakaf adalah amal jariyah yang pahalanya terus mengalir tanpa henti.
            Melalui wakaf, Anda dapat memberikan manfaat yang berkelanjutan bagi
            umat dan lingkungan sekitar.
          </p>
        </div>

        {/* Pengertian Wakaf */}
        <div className="relative flex flex-col-reverse lg:flex-row-reverse sm:gap-20 items-center justify-center">
          <div className="my-auto">
            <h2 className="text-2xl sm:text-4xl font-semibold mb-2 sm:mb-4 mt-10 sm:mt-0 text-secondary">
              Q.S Ali Imran ayat 92
            </h2>
            <div className="w-full flex border-2 p-4 sm:p-10 flex-col gap-6 sm:gap-4 z-[1]">
              <p className="text-xl sm:text-2xl text-right">
                لَنْ تَنَالُوا الْبِرَّ حَتّٰى تُنْفِقُوْا مِمَّا تُحِبُّوْنَ
                ۗوَمَا تُنْفِقُوْا مِنْ شَيْءٍ فَاِنَّ اللّٰهَ بِهٖ عَلِيْمٌ
              </p>
              <p className="text-gray-700 mb-6 text-sm xl:text-lg text-justify italic">
                &ldquo;Kamu tidak akan memperoleh kebajikan, sebelum kamu
                menginfakkan sebagian harta yang kamu cintai. Dan apapun yang
                kamu infakkan, tentang hal itu sungguh, Allah Maha Mengetahui.&rdquo;
              </p>
            </div>
          </div>
          <div>
            <div className="relative border-4 border-secondary w-[250px] h-[230px] sm:w-[395px] sm:h-[377px] xl:w-[395px] xl:h-[377px] z-[1] mt-10">
              <div className="absolute -top-5 sm:-top-10 -right-5 sm:-right-10 z-0">
                <div className="relative aspect-square w-[250px] h-[230px] sm:w-[395px] sm:h-[377px] xl:w-[395px] xl:h-[377px]">
                  <Image
                    src="/images/al-quran.jpg"
                    alt="bg-vector"
                    fill={true}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-0">
        <div className="relative aspect-square w-[280px] h-[740px] rotate-180">
          <Image
            src="/images/bg-vector-3-5.png"
            alt="bg-vector"
            fill={true}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};



export default WhatIsWakaf;
