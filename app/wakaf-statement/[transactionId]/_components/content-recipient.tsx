import { User } from '@prisma/client'
import React from 'react'

interface IProps {
  data: User;
}

function ContentRecipient({ data }: IProps) {
  return (
    <>
      <section>
        <div className="w-full mt-4 flex flex-col gap-2">
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Nama</span>
            {" : "}
            <span className="block w-full font-semibold">
              {data.name || 'tidak diisi'}
            </span>
          </div>
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Pekerjaan</span>
            {" : "}
            <span className="block w-full font-semibold">
              {data.profession || 'tidak diisi'}
            </span>
          </div>
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Instansi</span>
            {" : "}
            <span className="block w-full font-semibold">
              {data.institution || 'tidak diisi'}
            </span>
          </div>
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Alamat</span>
            {" : "}
            <span className="block w-full font-semibold">
              {data.address || 'tidak diisi'}
            </span>
          </div>
        </div>
      </section>
      <p className="italic my-4">
        (Selaku Penerima Wakaf yang selanjutnya disebut pihak ke-II)
      </p>
    </>
  )
}

export default ContentRecipient