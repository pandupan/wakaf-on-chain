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
import Link from "next/link";
import { toast } from "sonner";

const ShareContent = ({ urlShare }: { urlShare: string }) => {
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(urlShare).then(() => {
        toast.success('Link copied to clipboard');
      }).catch(err => {
        toast.error('Failed to copy the link: ' + err);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = urlShare;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Link copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy the link: ' + err);
      }
      document.body.removeChild(textArea);
    }
  };

  const urlShareWhatsapp = `https://wa.me/085870980885/?text=${encodeURIComponent(urlShare)}`;
  const urlShareTelegram = `https://t.me/share/url?url=${encodeURIComponent(urlShare)}`;
  const urlShareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlShare)}`;
  const urlShareTwitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlShare)}`;
  const urlShareLine = `https://line.me/R/msg/text/?${encodeURIComponent(urlShare)}`;

  return (
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
              <Link href={urlShareWhatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <FaWhatsapp className="text-green-500 text-3xl" />
                <p className="mt-1">WhatsApp</p>
              </Link>
              <Link href={urlShareTelegram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <FaTelegramPlane className="text-blue-400 text-3xl" />
                <p className="mt-1">Telegram</p>
              </Link>
              <Link href={urlShareLine} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <SiLine className="text-green-600 text-3xl" />
                <p className="mt-1">Line</p>
              </Link>
              <Link href={urlShareFacebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <FaFacebook className="text-blue-600 text-3xl" />
                <p className="mt-1">Facebook</p>
              </Link>
              <Link href={urlShareTwitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <FaTwitter className="text-blue-400 text-3xl" />
                <p className="mt-1">X</p>
              </Link>
              <button onClick={handleCopyLink} className="flex flex-col items-center">
                <FaLink className="text-gray-500 text-3xl" />
                <p className="mt-1">Salin Tautan</p>
              </button>
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
  );
};

export default ShareContent;
