import React, { useState } from "react";
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
  FaTelegramPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

const ShareCardSertificate = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const urlShare = `${baseUrl}/surat-pernyataan/${id}`;
  const urlShareTelegram = `https://t.me/share/url?url=${encodeURIComponent(urlShare)}`;
  const urlShareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlShare)}`;
  const urlShareTwitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlShare)}`;
  const urlShareInstagram = `https://www.instagram.com/?url=${encodeURIComponent(urlShare)}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
          <IoMdShare className="text-xs" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">
            Bagikan Surat Pernyataan Ini!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h2 className="font-semibold mb-4 text-left">
            Mau bagiin lewat mana?
          </h2>
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center gap-6">
              <Link href={urlShareTelegram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <FaTelegramPlane className="text-blue-400 text-3xl" />
                <p className="mt-1">Telegram</p>
              </Link>
              <Link href={urlShareFacebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <FaFacebook className="text-blue-600 text-3xl" />
                <p className="mt-1">Facebook</p>
              </Link>
              <Link href={urlShareTwitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <FaTwitter className="text-blue-400 text-3xl" />
                <p className="mt-1">X</p>
              </Link>
              <Link href={urlShareInstagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <FaInstagram className="text-pink-500 text-3xl" />
                <p className="mt-1">Instagram</p>
              </Link>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Lain kali aja?
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareCardSertificate;
