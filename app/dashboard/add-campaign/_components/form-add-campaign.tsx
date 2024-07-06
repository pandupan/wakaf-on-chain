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
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import Image from 'next/image'
import { campaignSchema } from '@/schemas'
import { addThousandSeparatorNumber } from '@/lib/utils'

function FormAddCampaign() {
  const [adding, setAdding] = useState(false);
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      description: '',
      phone: '',
      target: '',
      title: '',
    }
  });

  const onSubmit = (data: z.infer<typeof campaignSchema>) => {
    console.log(data);
  };

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
                    <Input placeholder="Masukan judul kampanye" {...field} />
                  </FormControl>
                  <FormDescription>Judul kampanye harus jelas dan mudah dipahami wakif.</FormDescription>
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
                              src={URL.createObjectURL(field.value)}
                              alt="uploaded-pic"
                              fill={true}
                              className="object-contain"
                            />
                          </div>
                          <button
                            type="button"
                            className="absolute bottom-3 right-3 p-3 rounded-full border bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
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
                  <FormControl>
                    <Input placeholder="Masukan kategori" {...field} />
                  </FormControl>
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
                        placeholder="Misal: 12.000.000"
                        className="pl-12"
                        onChange={(e) => {
                          e.target.value = addThousandSeparatorNumber(+e.target.value.replace(/[^0-9]/g, ''));
                          form.setValue('target', e.target.value);
                        }}
                      />
                      <span className="absolute top-[50%] -translate-y-[50%] h-full px-2 bg-gray-100 text-sm flex items-center justify-center rounded-l-lg border">
                        Rp
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>Target wakaf harus sesuai dengan kebutuhan masalah.</FormDescription>
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
                    <Input placeholder="Misal: 082123456789" {...field} />
                  </FormControl>
                  <FormDescription>Nomor WhatsApp harus yang aktif untuk membantu wakif jika ada masalah.</FormDescription>
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
                  <FormDescription>Deksripsi harus jelas kenapa Anda membuat kampanye ini.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit" variant="secondary" className="mt-4" disabled={adding}>
              {!adding ? 'Submit' : (
                <VscLoading fontSize={24} className="animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormAddCampaign