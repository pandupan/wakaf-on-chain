import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const OurPlatform = () => {
  return (
    <section id="about" className="relative overflow-hidden mt-10 sm:mt-16">
      <div className="relative flex container flex-col-reverse lg:flex-row justify-center items-center gap-10 sm:gap-20 pt-6 pb-16 sm:pb-24 z-[1]">
        <div>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary mb-4">
            Keunggulan Kami
          </h1>
          <div className="flex border-2 p-4 sm:p-10 flex-col sm:gap-4 z-[1]">
            <p className=" text-sm xl:text-lg text-justify">
              Website kami telah menggunakan teknologi blockchain untuk
              memastikan pengelolaan wakaf yang <span className="text-secondary font-bold">transparan dan akuntabel. </span>
              Berikut adalah keunggulan yang kami tawarkan:
            </p>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Transparansi dan Akuntabilitas
                </AccordionTrigger>
                <AccordionContent>
                  Penerapan teknologi blockchain memastikan bahwa setiap
                  transaksi wakaf tercatat secara transparan dan dapat diaudit.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Open Source Funding</AccordionTrigger>
                <AccordionContent>
                  Memanfaatkan pendanaan open source melalui teknologi
                  blockchain untuk meningkatkan dana operasional pesantren
                  secara berkelanjutan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Ekosistem Wakaf Digital</AccordionTrigger>
                <AccordionContent>
                  Menyediakan platform digital yang mendukung penggalangan dana
                  dan redistribusi kekayaan secara adil dan efisien.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Pemantauan Dana Wakaf</AccordionTrigger>
                <AccordionContent>
                  Teknologi blockchain memungkinkan pemantauan dana wakaf secara
                  real-time, memastikan dana digunakan tepat sasaran.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div>
          <div className="relative border-4 border-secondary w-[250px] h-[230px] sm:w-[395px] sm:h-[377px] xl:w-[595px] xl:h-[477px] bg-white z-[1]">
            <div className="absolute -top-5 sm:-top-10 -left-5 sm:-left-10 z-0">
              <div className="relative aspect-square w-[250px] h-[230px] sm:w-[395px] sm:h-[377px] xl:w-[595px] xl:h-[477px]">
                <Image src="/images/CWLD.jpg" alt="bg-vector" fill={true} className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-20 -left-12 z-0">
        <div className="relative aspect-square w-[608px] h-[656px]">
          <Image
            src="/images/bg-vector-3-2.png"
            alt="bg-vector"
            fill={true}
          />
        </div>
      </div>
    </section>
  );
};

export default OurPlatform;
