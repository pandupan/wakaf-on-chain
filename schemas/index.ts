import { z } from "zod"

const phoneRegex = /^08[0-9]{9,11}$/;

export const campaignSchema = z.object({
  title: z.string().min(5, {
    message: "Judul kampanye minimal 10 karakter.",
  }),
  description: z.string().min(100, {
    message: "Deskripsi minimal 100 karakter.",
  }),
  category: z.string().min(1, {
    message: "Kategori harus diisi.",
  }),
  target: z.string()
    .transform((price) => price.replace(/[^0-9]/g, ''))
    .refine((price) => {
      const numericValue = parseFloat(price);
      return !isNaN(numericValue) && numericValue >= 100000;
    }, {
      message: "Target wakaf harus sama dengan atau lebih dari Rp100.000.",
    }),
  phone: z.string()
    .min(1, {
      message: "Nomor WhatsApp harus diisi.",
    })
    .regex(phoneRegex, {
      message: "Nomor WhatsApp tidak valid."
    }),
  image: z
    .custom<FileList[0] | undefined>()
    .refine((file) => file, {
      message: "Banner kampanye harus diisi.",
    })
    .refine((file) => file && (!!file && file.size <= 2 * 1024 * 1024), {
      message: "Banner kampanye maksimal 2MB.",
    })
    .refine((file) => file && (!!file && file.type?.startsWith("image")), {
      message: "Hanya gambar yang diizinkan.",
    }),
});