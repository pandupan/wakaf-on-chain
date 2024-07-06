import ErrorLayout from "@/components/error-layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <ErrorLayout
      title="Ohh Tidak... 404"
      description="Maaf, halaman yang dicari tidak ditemukan atau sudah di hapus oleh server."
    />
  )
}