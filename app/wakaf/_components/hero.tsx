import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <section>
      <div className="container h-screen w-full flex items-center space-y-4">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-[765px]">
            Berwakaf untuk
            <span className="text-secondary"> kebaikan abadi</span>
          </h1>
          <div>
            <h3 className="text-gray-600 text-base md:text-lg lg:text-2xl font-medium">
              Manfaatkan hartamu untuk kebaikan
            </h3>
            <p className="text-gray-500 max-w-xl leading-relaxed">
              Wakaf adalah amalan yang tidak akan terputus pahalanya. Melalui wakaf, Anda bisa memberikan manfaat yang terus mengalir bagi umat dan lingkungan sekitar. Bergabunglah dengan gerakan wakaf kami dan jadilah bagian dari perubahan positif yang abadi.
            </p>
          </div>
          <a href="#about">
            <Button variant="secondary" className="p-4 mt-4 gap-2">
              Pelajari lebih lanjut <FaArrowRightLong />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
