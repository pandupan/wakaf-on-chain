import axios from "axios";
import { toast } from "sonner";

function useCompressImage() {
  async function uploadAndCompressImage(file: FileList[0], width: number, height: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('width', `${width}`);
    formData.append('height', `${height}`);

    return new Promise<Promise<string>>((resolve) => {
      const promise = axios('/api/compress-image', {
        method: 'POST',
        data: formData,
      });

      toast.promise(promise, {
        loading: 'Mengompress gambar...',
        success: async (res) => {
          resolve(res.data);
          return 'Gambar berhasil di kompresi.';
        },
        error: 'Gagal mengompress gambar.',
      });
    })
  }

  return {
    uploadAndCompressImage
  }
}

export default useCompressImage