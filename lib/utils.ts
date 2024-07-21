import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function indonesiaRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { locale: id, addSuffix: true });
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

export const numberPrefixer = (num: number, toFixed = 1) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(toFixed) + 'm';
  if (num >= 1000000) return (num / 1000000).toFixed(toFixed) + 'jt';
  if (num >= 1000) return (num / 1000).toFixed(toFixed) + 'rb';
  return num.toString();
};

export function formatRupiah(value: number): string {
  return value
    .toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    })
}

export function addThousandSeparatorNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function getInitials(fullName: string): string {
  // Trim any extra spaces and split the full name into words
  const names = fullName.trim().split(/\s+/);

  // If there's only one name, return the first two characters in uppercase
  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }

  // Otherwise, return the first character of the first two names
  return (names[0][0] + names[1][0]).toUpperCase();
}

export function formatIndonesianDate(date: Date, config?: {
  withoutDayName?: boolean;
}): string {
  // Days of the week in Indonesian
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // Months of the year in Indonesian
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  let result = '';

  if (!config?.withoutDayName) {
    result = `${dayName}, `
  }

  result += `${day.toString().padStart(2, '0')} ${month} ${year} ${hours}:${minutes}`

  return result;
}