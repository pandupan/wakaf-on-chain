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
import { useEffect, useRef, useState } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdAdd, MdDelete } from 'react-icons/md'
import Image from 'next/image'
import { campaignSchemaRaw } from '@/schemas'
import { addThousandSeparatorNumber, formatRupiah } from '@/lib/utils'
import { wakafCategories, WITHDRAW_MINIMAL } from '@/app/dashboard/_constants/data'
import { toast } from 'sonner'
import axios, { AxiosError } from "axios"
import { useRouter } from 'next/navigation'
import useCompressImage from '@/hooks/useCompressImage'
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast'
import { Campaign } from '@prisma/client'
import { IoMdCloseCircleOutline } from 'react-icons/io'

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
  const [imageDetailCount, setImageDetailCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const dynamicCampaignSchema = z.object({
    ...campaignSchemaRaw,
    target: z.string()
      .transform((price) => price.replace(/[^0-9]/g, ''))
      .refine((price) => {
        const numericValue = parseFloat(price);
        return !isNaN(numericValue) && numericValue >= WITHDRAW_MINIMAL;
      }, {
        message: "Target wakaf harus sama dengan atau lebih dari Rp100.000.",
      })
      .refine((price) => {
        return (mode === 'create') || (+price >= props.data.collected);
      }, {
        message: "Target wakaf harus lebih dari wakaf terkumpul",
      })
      .refine((price) => {
        if (mode === 'create' || props.data.availableBalance >= WITHDRAW_MINIMAL) return true;
        const { collected, availableBalance } = props.data;
        return +price >= collected + (WITHDRAW_MINIMAL - availableBalance);
      }, {
        message: mode === 'edit' ?
          `Target wakaf harus lebih dari ${formatRupiah(props.data.collected + (WITHDRAW_MINIMAL - props.data.availableBalance) - 1)}`
          : 'Invalid input',
      })
  });

  const form = useForm<z.infer<typeof dynamicCampaignSchema>>({
    resolver: zodResolver(dynamicCampaignSchema),
    defaultValues: {
      description: '',
      phone: '',
      target: '',
      title: '',
      imageDetail1: undefined,
      imageDetail2: undefined,
      imageDetail3: undefined,
      imageDetail4: undefined,
      imageDetail5: undefined,
    }
  });

  const { handleAxiosErrorToast } = useAxiosErrorToast();
  const { bulkCompressImages } = useCompressImage();
  const navigate = useRouter();

  const watch = form.watch;
  const detailImageInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: z.infer<typeof dynamicCampaignSchema>) => {
    // Gambar di create pasti dalam bentuk file bukan string
    if (mode === 'create' && typeof data.image === 'object') {
      setLoading(true);
      const images = [
        data.image,
        data.imageDetail1,
        data.imageDetail2,
        data.imageDetail3,
        data.imageDetail4,
        data.imageDetail5,
      ].filter((img) => typeof img === 'object');

      const compressedImages = (await bulkCompressImages(images as File[], 400, 300)) as (string)[];

      axios('/api/admin/campaign', {
        method: 'POST',
        data: {
          ...data,
          image: compressedImages[0],
          imageDetail1: compressedImages[1],
          imageDetail2: compressedImages[2],
          imageDetail3: compressedImages[3],
          imageDetail4: compressedImages[4],
          imageDetail5: compressedImages[5],
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
      const { data: { id } } = props;
      setLoading(true);

      let images: (string | File | undefined)[] = [
        data.image,
        data.imageDetail1,
        data.imageDetail2,
        data.imageDetail3,
        data.imageDetail4,
        data.imageDetail5,
      ]

      const fileImages = images.filter((img) => typeof img === 'object');

      // Cek jika ada gambar yang diubah
      if (fileImages.length > 0) {
        const compressedImages = (await bulkCompressImages(fileImages as File[], 400, 300)) as string[];

        // Simpan hasil kompress di variabel images dengan menggantikan data yang tipenya File
        let fileIndex = 0;
        compressedImages.forEach((cImg) => {
          // Temukan elemen yang bertipe File dan gantikan dengan gambar terkompresi
          for (let i = 0; i < images.length; i++) {
            if (typeof images[i] === 'object') {
              images[i] = cImg;
              fileIndex++;
              break;
            }
          }
        });
      }

      axios('/api/admin/campaign', {
        method: 'PUT',
        data: {
          ...data,
          image: images[0],
          imageDetail1: images[1],
          imageDetail2: images[2],
          imageDetail3: images[3],
          imageDetail4: images[4],
          imageDetail5: images[5],
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

      const detailImages = [
        data.imageDetail1,
        data.imageDetail2,
        data.imageDetail3,
        data.imageDetail4,
        data.imageDetail5,
      ]

      let countImages = 1;
      detailImages.forEach((image, index) => {
        if (image) {
          // @ts-expect-error
          form.setValue(`imageDetail${index + 1}`, image);
          countImages++;
        };
      });

      setImageDetailCount(countImages);
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
            <div className="space-y-2 sm:col-span-2">
              <h4 className="text-sm font-semibold">Gambar Detail</h4>
              <div className="w-full overflow-x-auto">
                <div className="flex w-max gap-2">
                  {Array.from({ length: imageDetailCount }).map((_, index, arr) => {
                    // @ts-expect-error
                    const value: string | File | undefined = watch(`imageDetail${index + 1}`);
                    if (!value) return null;

                    return (
                      <div
                        key={`img-d-${index}`}
                        className="relative w-[100px] sm:w-[150px] aspect-[4/3] rounded-md overflow-hidden border"
                      >
                        {index === arr.length - 2 && (
                          <button
                            className="absolute top-1 right-1 text-destructive bg-white/50 backdrop-blur rounded-full"
                            onClick={() => {
                              // @ts-expect-error
                              form.setValue(`imageDetail${index + 1}`, undefined);
                              setImageDetailCount((prev) => prev - 1);
                            }}
                          >
                            <IoMdCloseCircleOutline />
                          </button>
                        )}
                        <img
                          src={typeof value === 'string' ? value : URL.createObjectURL(value)}
                          alt={`image detail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )
                  })}
                  {imageDetailCount <= 5 && (
                    <label
                      role="button"
                      className="flex justify-center items-center w-[100px] sm:w-[150px] aspect-[4/3] rounded-md overflow-hidden border-2 border-dashed"
                    >
                      <input
                        ref={detailImageInputRef}
                        id="detail-image"
                        accept="image/*"
                        type="file"
                        className="w-0 h-0"
                        name="detail-image"
                        disabled={loading}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const file = e.target.files[0];

                            if (file && detailImageInputRef.current) {
                              // @ts-expect-error
                              form.setValue(`imageDetail${imageDetailCount}`, file);
                              detailImageInputRef.current.value = '';
                              setImageDetailCount((prev) => prev + 1)
                            }
                          }
                        }}
                      />
                      <div className="text-gray-500 text-center space-y-1">
                        <MdAdd className="mx-auto" />
                        <span className="text-xs">Tambah</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
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
                    Deksripsi harus jelas kenapa anda membuat kampanye ini.
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