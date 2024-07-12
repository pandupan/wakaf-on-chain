'use client'

import { RichtextEditor } from '@/components/core/richtext-editor'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import Image from 'next/image'
import { campaignSchema, campaignSchemaRaw } from '@/schemas'
import { addThousandSeparatorNumber, formatRupiah } from '@/lib/utils'
import { wakafCategories } from '@/app/dashboard/_constants/data'
import { toast } from 'sonner'
import axios, { AxiosError } from "axios"
import { useRouter } from 'next/navigation'
import useCompressImage from '@/hooks/useCompressImage'
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast'
import { Campaign } from '@prisma/client'

interface EditProps {
  mode: 'edit';
  data: Campaign;
}

interface CreateProps {
  mode: 'create';
}

type PropTypes = EditProps | CreateProps;

function FormCampaign(props: PropTypes) {
  const { mode } = props;
  const [loading, setLoading] = useState(false);
  const dynamicCampaignSchema = z.object({
    ...campaignSchemaRaw,
    target: z.string()
      .transform((price) => price.replace(/[^0-9]/g, ''))
      .refine((price) => {
        const numericValue = parseFloat(price);
        return !isNaN(numericValue) && numericValue >= 100000;
      }, {
        message: "Target wakaf harus sama dengan atau lebih dari Rp100.000.",
      })
      .refine((price) => {
        return +price > (mode === 'create' ? 0 : props.data.collected);
      }, {
        message: "Target wakaf harus lebih dari wakaf terkumpul",
      })
  });

  const form = useForm<z.infer<typeof dynamicCampaignSchema>>({
    resolver: zodResolver(dynamicCampaignSchema),
    defaultValues: {
      description: '',
      phone: '',
      target: '',
      title: '',
    }
  });

  const { handleAxiosErrorToast } = useAxiosErrorToast();
  const { uploadAndCompressImage } = useCompressImage();
  const navigate = useRouter();

  const onSubmit = async (data: z.infer<typeof dynamicCampaignSchema>) => {
    // Gambar di create pasti dalam bentuk file bukan string
    if (mode === 'create' && typeof data.image === 'object') {
      setLoading(true);
      const compressImage = await uploadAndCompressImage(data.image!, 400, 300);

      axios('/api/admin/campaign', {
        method: 'POST',
        data: {
          ...data,
          image: `data:image/png;base64,${compressImage}`
        },
      })
        .then(() => {
          toast.success('Berhasil membuat kampanye.');
          navigate.push('/dashboard/management');
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          if (error.response) {
            handleAxiosErrorToast(error.response!.status);
          } else {
            toast.error('Internal Error');
          }
        });

      return;
    } else if (mode === 'edit') {
      setLoading(true);
      const { data: { id } } = props;
      const compressImage =
        typeof data.image === 'string' ?
          data.image.replaceAll('data:image/png;base64,', '') :
          await uploadAndCompressImage(data.image!, 400, 300);

      axios('/api/admin/campaign', {
        method: 'PUT',
        data: {
          ...data,
          image: `data:image/png;base64,${compressImage}`,
          id
        },
      })
        .then(() => {
          toast.success('Berhasil mengupdate kampanye.');
          navigate.push('/dashboard/management');
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          if (error.response) {
            handleAxiosErrorToast(error.response!.status);
          } else {
            toast.error('Internal Error');
          }
        });

      return;
    }
  };

  useEffect(() => {
    if (mode === 'edit') {
      const { data } = props;
      form.setValue('title', data.title);
      form.setValue('image', data.image);
      form.setValue('category', data.category);
      form.setValue('phone', data.phone);
      form.setValue('target', addThousandSeparatorNumber(data.target));
      form.setValue('description', data.description);
    }
  }, [mode]);

  return (
    <div className="sm:p-4">
      {/* @ts-ignore */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className="font-semibold">Judul</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukan judul kampanye"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormDescription>
                    Judul kampanye harus jelas dan mudah dipahami wakif.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel htmlFor="image" className="font-semibold">Banner Kampanye</FormLabel>
                  <FormControl>
                    <div className="relative flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full rounded-md">
                      {!field.value ? (
                        // eslint-disable-next-line jsx-a11y/label-has-associated-control
                        <label className="w-full">
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="h-[200px] flex flex-col justify-center items-center">
                              <p className="font-bold text-2xl">
                                <AiOutlineCloudUpload />
                              </p>
                              <p className="text-base">Klik untuk upload gambar</p>
                            </div>

                            <p className="absolute bottom-4 inset-x-0 text-center w-full text-gray-400 text-xs">
                              Rekomendasi: Gunakan format JPG, JPEG, SVG, PNG, GIF atau TIFF kurang dari 2MB
                            </p>
                          </div>
                          <input
                            id="image"
                            accept="image/*"
                            type="file"
                            className="w-0 h-0"
                            name="image"
                            disabled={loading}
                            onChange={(event) => {
                              if (event.target.files) {
                                field.onChange(event.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      ) : (
                        <div className="relative w-full h-full">
                          <div className="relative w-full h-[200px]">
                            <Image
                              src={typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value)}
                              alt="uploaded-pic"
                              fill={true}
                              className="object-contain"
                            />
                          </div>
                          <button
                            type="button"
                            className="absolute bottom-3 right-3 p-3 rounded-full border bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                            disabled={loading}
                            onClick={() => field.onChange(undefined)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className="font-semibold">Kategori</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={mode === 'edit' ? props.data.category : field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger className="text-muted-foreground">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wakafCategories.map((item) => (
                        <SelectItem
                          value={item.value}
                          key={item.id}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Target Wakaf</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Misal: 12.000.000"
                        className="pl-12"
                        onChange={(e) => {
                          e.target.value = addThousandSeparatorNumber(+e.target.value.replace(/[^0-9]/g, ''));
                          form.setValue('target', e.target.value);
                          if (mode === 'edit') form.trigger('target');
                        }}
                      />
                      <span className="absolute top-[50%] -translate-y-[50%] h-full px-2 bg-gray-100 text-sm flex items-center justify-center rounded-l-lg border">
                        Rp
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {mode === 'create' ?
                      'Target wakaf harus sesuai dengan kebutuhan masalah.' :
                      `Target harus lebih dari wakaf yang sudah terkumpul (${formatRupiah(props.data.collected)}).`
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Nomor WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Misal: 082123456789"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormDescription>
                    Nomor WhatsApp harus yang aktif untuk membantu wakif jika ada masalah.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className="font-semibold">Deskripsi</FormLabel>
                  <FormControl>
                    <RichtextEditor
                      value={field.value}
                      onChange={(output) => field.onChange(output)}
                    />
                  </FormControl>
                  <FormDescription>
                    Deksripsi harus jelas kenapa Anda membuat kampanye ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="secondary"
              className="mt-4 gap-2"
              disabled={loading}
            >
              {loading && <VscLoading className="animate-spin" />}
              {mode === 'create' ? 'Buat Kampanye' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormCampaign