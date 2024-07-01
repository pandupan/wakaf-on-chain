import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function abbreviateName(name: string): string {
  const words = name.split(' ');
  if (words.length === 1) {
    return name;
  }

  const firstName = words[0];
  const abbreviated = words.slice(1).map(word => `${word[0]}.`).join(' ');

  return `${firstName} ${abbreviated}`;
}
