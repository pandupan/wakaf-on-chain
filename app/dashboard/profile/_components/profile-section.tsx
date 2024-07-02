"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"


const formSchema = z.object({
  username: z.string().min(2, { message: "Username harus memiliki minimal 2 karakter." }),
  email: z.string().email({ message: "Email tidak valid." }),
  address: z.string().optional(),
  affiliation: z.string().optional(),
  nomorHP: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>


const ProfileSection = () => {
    const [image, setImage] = useState<string | null>(null)
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      address: "",
      affiliation: "",
      nomorHP: ''
    },
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.result) {
        setImage(reader.result as string)
      }
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col w-full lg:w-1/2 p-4">
        <div>
          <CardTitle className="text-blue-500">Profil Pengguna</CardTitle>
        </div>
        <div>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              {image ? (
                <AvatarImage src={image} />
              ) : (
                <>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </>
              )}
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <Button size="sm" variant="secondary" onClick={() => document.getElementById('image-upload')?.click()}>
              Update Gambar
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Pengguna</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama anda..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email anda..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nomorHP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor HP</FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor HP anda..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="affiliation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asal Intansi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Intansi yang terafiliasi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="masyarakat">Masyarakat</SelectItem>
                          <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                          <SelectItem value="pengurus">Pengurus Pondok Pesantren</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Input placeholder="Alamat Anda..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button size="sm" variant="secondary" type="submit">
                Update Profil
              </Button>
            </form>
          </Form>
        </div>
      </div>
  )
}

export default ProfileSection
