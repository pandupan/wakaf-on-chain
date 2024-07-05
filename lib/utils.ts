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

export const formatCategoryChartLabel = (num: number) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'm';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'jt';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'rb';
  return num.toString();
};

export function formatRupiah(value: number): string {
  return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace(',00', '');
}

export function addThousandSeparatorNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
