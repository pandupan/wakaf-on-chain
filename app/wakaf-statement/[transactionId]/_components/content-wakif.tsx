import QRCodeComponent from '@/components/shared/QRComponent';
import { User } from '@prisma/client'
import QRCode from 'qrcode.react'

interface IProps {
  data: User;
}

function ContentWakif({ data }: IProps) {
  return (
    <>
      <section>
        <p>Yang bertanda tangan di bawah ini kami wakif dan penerima wakaf menerangkan bahwa:</p>
        <div className="relative mt-4 flex flex-col gap-2">
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Nama Para/Ahli Waris</span>
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
          <div className="absolute top-[50%] -translate-y-[50%] right-4">
            <QRCodeComponent text={window.location.href} />
          </div>
        </div>
      </section>
      <p className="italic my-4">
        (Selaku Pewakaf/wakif yang selanjutnya disebut pihak ke-I)
      </p>
    </>
  )
}

export default ContentWakif