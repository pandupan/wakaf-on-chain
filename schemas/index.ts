import { z } from "zod";

export const campaignSchema = z.object({
  title: z.string().min(5, {
    message: "Judul kampanye minimal 10 karakter.",
  }),
  target: z.string().min(1, {
    message: "Target wakaf harus diisi.",
  }),
  phone: z.string().min(1, {
    message: "Nomor WhatsApp harus diisi.",
  }),
  description: z.string().min(100, {
    message: "Deskripsi minimal 100 karakter.",
  }),
  image: z
    .custom<FileList[0] | undefined>()
    .refine((file) => file && (!!file && file.size <= 10 * 1024 * 1024), {
      message: "The profile picture must be a maximum of 10MB.",
    })
    .refine((file) => file && (!!file && file.type?.startsWith("image")), {
      message: "Only images are allowed to be sent.",
    }),
});