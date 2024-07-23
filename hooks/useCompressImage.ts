import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

function useCompressImage() {
  const [bulkImagesCount, setBulkImagesCount] = useState(0);

  async function uploadAndCompressImage(
    file: FileList[0],
    width: number,
    height: number,
    config?: {
      onlyCompress?: boolean;
    }
  ) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('width', `${width}`);
    formData.append('height', `${height}`);

    const fetch = axios('/api/compress-image', {
      method: 'POST',
      data: formData,
    });

    if (config && config.onlyCompress) {
      try {
        return await fetch.then((res) => `data:image/png;base64,${res.data}`);
      } catch (error) {
        throw error;
      }
    }

    return new Promise<string>((resolve, reject) => {
      const promise = fetch;

      toast.promise(promise, {
        loading: 'Mengompress gambar...',
        success: async (res) => {
          resolve(`data:image/png;base64,${res.data}`);
          return 'Gambar berhasil di kompresi.';
        },
        error: (error) => {
          reject(error);
          return 'Gagal mengompress gambar.';
        },
      });
    })
  }

  async function bulkCompressImages(files: FileList[0][], width: number, height: number) {
    setBulkImagesCount(0);
    const totalFiles = files.length;

    const promise = new Promise<string[]>(async (resolve, reject) => {
      const compressedImages: string[] = [];
      try {
        for (const file of files) {
          setBulkImagesCount((prev) => prev + 1);
          try {
            const compressedImage = await uploadAndCompressImage(file, width, height, {
              onlyCompress: true
            });
            compressedImages.push(compressedImage);
          } catch (error) {
            throw new Error('Error when compressing image');
          }
        }
        setBulkImagesCount(0);
        resolve(compressedImages);
      } catch (error) {
        setBulkImagesCount(0);
        reject(error);
      }
    });

    return new Promise((resolve, reject) => {
      toast.promise(promise, {
        loading: `Mengompress gambar [${bulkImagesCount}/${totalFiles}]...`,
        success: (res) => {
          resolve(res);
          return `Gambar berhasil di kompresi [${res.length}/${totalFiles}].`;
        },
        error: (error) => {
          reject(error);
          return 'Gagal mengompress gambar.';
        },
      });
    });
  }

  return {
    uploadAndCompressImage,
    bulkCompressImages
  }
}

export default useCompressImage