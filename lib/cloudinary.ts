import { v2 as cloudinaryInit } from 'cloudinary';

cloudinaryInit.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinary = cloudinaryInit;

export const preset = {
  default: 'ml_default'
}

export const uploadImage = (image: string, preset: string, folder?: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.unsigned_upload(
      image,
      preset,
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};