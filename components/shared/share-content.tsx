import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoMdShare } from "react-icons/io";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaFacebook,
  FaTwitter,
  FaLink,
} from "react-icons/fa";
import { SiLine } from "react-icons/si";

const ShareContent = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <IoMdShare className="text-xs" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">
              Yu ajak yang lain, melakukan kebaikan bersama!!
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <h2 className="font-semibold mb-4 text-left">
              Mau bagiin lewat mana?
            </h2>
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center gap-6">
                <div className="flex flex-col items-center">
                  <FaWhatsapp className="text-green-500 text-3xl" />
                  <p className="mt-1">WhatsApp</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaTelegramPlane className="text-blue-400 text-3xl" />
                  <p className="mt-1">Telegram</p>
                </div>
                <div className="flex flex-col items-center">
                  <SiLine className="text-green-600 text-3xl" />
                  <p className="mt-1">Line</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaFacebook className="text-blue-600 text-3xl" />
                  <p className="mt-1">Facebook</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaTwitter className="text-blue-400 text-3xl" />
                  <p className="mt-1">X</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaLink className="text-gray-500 text-3xl" />
                  <p className="mt-1">Salin Tautan</p>
                </div>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button variant="secondary">
              Lain kali aja?
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareContent;
