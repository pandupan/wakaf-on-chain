import { z } from "zod"

const phoneRegex = /^08[0-9]{9,11}$/;

const dynamicImageSchema = ({
  requiredMessage,
  sizeMessage,
  optional
}: {
  requiredMessage: string;
  sizeMessage: string;
  optional?: boolean;
}) => {
  return z
    .custom<FileList[0] | undefined | string>()
    .refine((file) => (!file && optional) || file, {
      message: requiredMessage,
    })
    .refine((file) => (!file && optional) || (file && (
      typeof file === 'string' || (!!file && file.size <= 2 * 1024 * 1024)
    )), {
      message: sizeMessage,
    })
    .refine((file) => (!file && optional) || (file && (
      typeof file === 'string' || !!file && file.type?.startsWith("image"))
    ), {
      message: "Hanya gambar yang diizinkan.",
    })
}

export const campaignSchemaRaw = {
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
  image: dynamicImageSchema({
    requiredMessage: 'Banner kampanye harus diisi',
    sizeMessage: 'Banner kampanye maksimal 3MB',
  }),
  imageDetail1: dynamicImageSchema({
    requiredMessage: 'Gambar detail harus diisi',
    sizeMessage: 'Gambar detail maksimal 3MB',
    optional: true
  }),
  imageDetail2: dynamicImageSchema({
    requiredMessage: 'Gambar detail harus diisi',
    sizeMessage: 'Gambar detail maksimal 3MB',
    optional: true
  }),
  imageDetail3: dynamicImageSchema({
    requiredMessage: 'Gambar detail harus diisi',
    sizeMessage: 'Gambar detail maksimal 3MB',
    optional: true
  }),
  imageDetail4: dynamicImageSchema({
    requiredMessage: 'Gambar detail harus diisi',
    sizeMessage: 'Gambar detail maksimal 3MB',
    optional: true
  }),
  imageDetail5: dynamicImageSchema({
    requiredMessage: 'Gambar detail harus diisi',
    sizeMessage: 'Gambar detail maksimal 3MB',
    optional: true
  }),
}

export const campaignSchema = z.object(campaignSchemaRaw);

export const profileSchema = z.object({
  name: z.string().min(2, { message: "Username harus memiliki minimal 2 karakter." }),
  email: z.string().email({ message: "Email tidak valid." }),
  address: z.string().min(1, {
    message: 'Alamat harus diisi.'
  }),
  profession: z.string().min(1, {
    message: 'Pekerjaan harus diisi.'
  }),
  institution: z.string().min(1, {
    message: 'Instansi harus diisi.'
  }),
  phoneNumber: z.string()
    .min(1, {
      message: 'Nomor HP harus diisi.'
    })
    .regex(phoneRegex, {
      message: "Nomor HP tidak valid."
    }),
  image: dynamicImageSchema({
    requiredMessage: 'Poto profil harus diisi',
    sizeMessage: 'Poto profil maksimal 3MB',
  }),
});

export const transactionSchema = z.object({
  name: z.string().min(1),
  isHiddenName: z.boolean(),
  email: z.string().email(),
  amount: z.number().min(20000),
  paymentMethodId: z.string().min(1, {
    message: "Metode pembayaran harus diisi."
  }),
  paymentMethodLabel: z.string().min(1, {
    message: "Label metode pembayaran harus diisi."
  }),
  message: z.string().optional(),
  userId: z.string().min(1, {
    message: "User id harus diisi."
  }),
  campaignId: z.number().min(1),
});

export const accountSchema = z.object({
  bankName: z.string().min(1, { message: "Nama Bank/Wallet tidak boleh kosong" }),
  accountNumber: z.string()
    .min(1, { message: "No Rek/Telepon tidak boleh kosong" })
    .min(6, { message: "No Rek/Telepon harus memiliki minimal 6 karakter" }),
  accountHolder: z.string().min(1, { message: "Atas Nama tidak boleh kosong" }),
});