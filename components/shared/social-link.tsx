import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

interface IProps {
  href: string;
  Icon: IconType;
  label: string;
  onClick?: () => void;
}

const SocialLink = ({ href, Icon: Icon, label, onClick }: IProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center"
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <Icon className="text-secondary text-2xl sm:text-3xl" />
      <p className="mt-1 text-xs sm:text-sm">{label}</p>
    </Link>
  );
};

export default SocialLink;
