'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { profileSchema } from "@/schemas"
import Image from "next/image"
import { cn, getInitials } from "@/lib/utils"
import { User } from "@prisma/client"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import useCompressImage from "@/hooks/useCompressImage"
import { useRouter } from "next/navigation"
import { VscLoading } from "react-icons/vsc"
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast"

interface IProps {
  data: User;
}

const Profile: React.FC<IProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      institution: "",
      phoneNumber: "",
      profession: ""
    },
  })

  const { handleAxiosErrorToast } = useAxiosErrorToast();
  const { uploadAndCompressImage } = useCompressImage();
  const navigate = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof profileSchema>> = async (data) => {
    setLoading(true);
    const { image } = data;
    const compressImage = typeof image === 'string' ? image : await uploadAndCompressImage(image!, 100, 100);

    axios('/api/profile', {
      method: 'PUT',
      data: {
        ...data,
        image: compressImage
      },
    })
      .then((res) => {
        toast.success('Profil berhasil di update.');
        navigate.refresh();
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          handleAxiosErrorToast(error.response!.status);
        } else {
          toast.error('Internal Error');
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    form.setValue('image', data.image || '');
    form.setValue('name', data.name || '');
    form.setValue('email', data.email || '');
    form.setValue('phoneNumber', data.phoneNumber || '');
    form.setValue('institution', data.institution || '');
    form.setValue('address', data.address || '');
  }, []);

  return (
    <div className="bg-background px-4 py-10 rounded-xl shadow-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-2"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-2 pb-4">
                <FormControl>
                  <label className={cn(
                    'relative block w-24 mx-auto aspect-square rounded-full bg-muted overflow-hidden',
                    !loading ? 'cursor-pointer group' : 'opacity-50'
                  )}>
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
                    {field.value ? (
                      <Image
                        src={typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value)}
                        alt="profile image"
                        fill={true}
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-extrabold">
                        {getInitials('Aam Hermansyah')}
                      </div>
                    )}
                    {!loading && (
                      <div
                        className="
                        absolute 
                        inset-0 
                        bg-foreground/10 
                        backdrop-blur-sm 
                        opacity-0 
                        group-hover:opacity-100 
                        rounded-full 
                        flex 
                        justify-center 
                        items-center
                        transition
                      "
                      >
                        <span className="text-xs">
                          Change profile
                        </span>
                      </div>
                    )}
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>Nama Pengguna</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukan nama lengkap"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukan email"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nomor HP</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nomor HP yang aktif"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Asal Intansi</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={data.institution || field.value}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih instansi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="masyarakat">Masyarakat</SelectItem>
                    <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                    <SelectItem value="pengurus" disabled={data.role === 'USER'}>
                      Pengurus Pondok Pesantren
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Pekerjaan</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukan pekerjaan"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukan alamat"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 pt-2">
            <Button size="sm" variant="secondary" type="submit" className="gap-2" disabled={loading}>
              {loading && <VscLoading className="animate-spin" />}
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Profile
