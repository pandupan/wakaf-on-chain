'use client'

import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Header from "./header";
import HeaderBody from "./header-body";
import Content from "./content";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { Campaign, Transaction, User } from "@prisma/client";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"]
});

interface IProps {
  recipient: User;
  transaction: Transaction & {
    user?: User | null;
    campaign?: Campaign
  };
}

function LayoutStatement({ recipient, transaction }: IProps) {
  const [printing, setPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      setPrinting(true);
      const input = printRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("surat-pernyataan-wakaf.pdf");
        setPrinting(false);
      });
    }
  };

  return (
    <>
      <main
        ref={printRef}
        className={cn(
          'max-w-3xl mx-auto bg-white p-6 sm:p-10 md:p-16 pb-20 print:p-4 sm:shadow-md print:shadow-none rounded-lg',
          merriweather.className
        )}
      >
        <Header />
        <Separator className="bg-gray-800" />
        <HeaderBody />
        <Content data={{ recipient, transaction }} />
      </main>
      <div className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10">
        <Button
          onClick={handlePrint}
          className="rounded-full shadow-md gap-2"
          disabled={printing}
        >
          {printing && <VscLoading className="animate-spin" />}
          Cetak/Print
        </Button>
      </div>
    </>
  )
}

export default LayoutStatement