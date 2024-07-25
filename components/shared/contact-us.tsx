'use client'

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { ADMIN_EMAIL } from "@/lib/constants";

const ContactUs = () => {
  const contactMethods = [
    {
      icon:
        <MdOutlineMail fontSize={24} />
      ,
      contact: ADMIN_EMAIL
    },
    {
      icon:
        <MdOutlinePhone fontSize={24} />
      ,
      contact: "+62 (82) 316-126-449"
    },
    {
      icon:
        <CiLocationOn fontSize={24} />
      ,
      contact: "Jl. R.E. Martadinata Panyingkiran No.224 Kota Tasikmalaya"
    },
  ]

  return (
    <section id="contact" className="pt-8 pb-14">
      <div className="container text-gray-600">
        <div className="gap-12 justify-between lg:flex lg:max-w-none">
          <div className="space-y-3 flex-1">
            <h2 className="text-secondary text-2xl lg:text-4xl font-bold">
              Hubungi Kami
            </h2>

            <div className="flex-1 text-center mt-4 rounded-lg overflow-hidden">
              <img src="https://picsum.photos/id/83/1600/900" className="w-full aspect-video" />
            </div>

            <div className="pt-4">
              <p className="text-gray-800 text-2xl font-semibold sm:text-4xl">
                Ada masalah atau saran?
              </p>
              <p>
                Kami disini menampung segala masukan berupa masalah, saran, dan solusi yang ada di lingkungan pondok pesantren! Isi formulir atau kamu bisa menghubungi informasi kontak dibawah:
              </p>
            </div>
            <div>
              <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                {
                  contactMethods.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-x-3">
                      <div className="flex-none text-gray-400">
                        {item.icon}
                      </div>
                      <p>{item.contact}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="flex-1 mt-12">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div className="space-y-1">
                <Label htmlFor="name" className="text-base">Nama Lengkap</Label>
                <Input id="name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-base">Alamat Email</Label>
                <Input type="email" id="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="subject" className="text-base">Tujuan/Subjek</Label>
                <Input id="subject" />
              </div>
              <div>
                <Label htmlFor="message" className="text-base">Pesan</Label>
                <Textarea id="message" className="h-[200px] resize-none"></Textarea>
              </div>
              <Button variant="secondary" className="w-full">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default ContactUs;
