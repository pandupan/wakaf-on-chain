'use client'

import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Header from "./header";
import HeaderBody from "./header-body";
import Content from "./content";
import { Button } from "@/components/ui/button";
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
  return (
    <>
      <main
        className={cn(
          'max-w-3xl mx-auto bg-white p-6 sm:p-10 md:p-16 print:px-4 print:py-0 sm:shadow-md print:sm:shadow-none rounded-lg',
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
          onClick={() => window.print()}
          className="rounded-full shadow-md gap-2 print:hidden"
        >
          Cetak/Print
        </Button>
      </div>
    </>
  )
}

export default LayoutStatement