import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="pt-24 md:pt-0 mb-10">
      <div className="container md:h-screen w-full flex flex-col-reverse md:flex-row items-center gap-10 space-y-4">
        <div className="flex-1 space-y-2 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold max-w-[765px]">
            <i>Berwakaf</i> untuk
            <span className="text-secondary"> <i>kebaikan</i> abadi</span>
          </h1>
          <div>
            <h3 className="text-gray-600 text-xl lg:text-2xl font-medium">
              Manfaatkan hartamu untuk kebaikan
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
              Wakaf adalah amalan yang tidak akan terputus pahalanya. Melalui wakaf, anda bisa memberikan manfaat yang terus mengalir bagi umat dan lingkungan sekitar.
            </p>
          </div>
          <div className="w-full sm:flex sm:items-center sm:gap-3 pt-4">
            <Link href="/dashboard/campaign">
              <Button variant="secondary" className="w-full p-4 gap-2">
                Berwakaf sekarang
              </Button>
            </Link>
            <Link href="#what-is-wakaf">
              <Button variant="outline" className="w-full p-4 gap-2 mt-3 sm:mt-0">
                Pelajari lebih lanjut <FaArrowRightLong />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative md:flex-1 w-full aspect-[4/3]">
          <img
            src="https://picsum.photos/id/83/1600/900"
            className="absolute inset-0 w-full h-full object-cover rounded-tr-lg"
            alt="hero image 1"
            style={{
              clipPath: 'polygon(1% 0, 100% 0, 100% 99%)'
            }}
          />
          <img
            src="https://picsum.photos/id/62/1600/900"
            className="absolute inset-0 w-full h-full object-cover rounded-bl-lg"
            alt="hero image 1"
            style={{
              clipPath: 'polygon(0 1%, 0% 100%, 99% 100%)'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
