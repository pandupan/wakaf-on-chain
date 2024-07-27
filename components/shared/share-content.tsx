"use client"

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
import useCopyText from "@/hooks/useCopyText";
import SocialLink from "./social-link";
import { IoCopy } from "react-icons/io5";

interface IProps {
  urlShare: string;
  title: string;
  description: string;
}

const ShareContent = ({ urlShare, description, title }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { copyToClipboard } = useCopyText();

  const urlShareTelegram = `https://t.me/share/url?url=${encodeURIComponent(urlShare)}`;
  const urlShareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlShare)}`;
  const urlShareTwitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlShare)}`;
  const urlShareInstagram = 'https://www.instagram.com/';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
          <IoMdShare className="text-xs" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-left">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {description}
        </DialogDescription>
        <div className="flex justify-center items-center gap-4 sm:gap-6">
          <button
            className="flex flex-col items-center"
            onClick={() => copyToClipboard(urlShare, {
              customSuccessMessage: 'Link url berhasil disalin.'
            })}
          >
            <IoCopy className="text-secondary text-2xl sm:text-3xl" />
            <p className="mt-1 text-xs sm:text-sm">
              Salin
            </p>
          </button>
          <SocialLink
            href={urlShareTelegram}
            Icon={FaTelegramPlane}
            label="Telegram"
          />
          <SocialLink
            href={urlShareFacebook}
            Icon={FaFacebook}
            label="Facebook"
          />
          <SocialLink
            href={urlShareTwitter}
            Icon={FaTwitter}
            label="X"
          />
          <SocialLink
            href={urlShareInstagram}
            Icon={FaInstagram}
            label="Instagram"
            onClick={() => copyToClipboard(urlShare, {
              customSuccessMessage: 'Link url berhasil disalin.'
            })}
          />
        </div>
        <DialogFooter>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsOpen(false)}
            className="text-xs"
          >
            Lain kali aja?
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareContent;
