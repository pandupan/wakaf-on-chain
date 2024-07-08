import ErrorLayout from "@/components/error-layout";

export default function NotFound() {
  return (
    <ErrorLayout
      title="Ohh Tidak... 404"
      description="Maaf, halaman yang dicari tidak ditemukan atau sudah di hapus oleh server."
    />
  )
}