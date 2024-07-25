import { formatIndonesianDate } from '@/lib/utils';
import React from 'react'

interface IProps {
  wakif: string;
  recipient: string;
  createdAt: Date;
}

function ContentFooter({ recipient, wakif, createdAt }: IProps) {
  return (
    <section className="flex justify-between">
      <div className="text-center">
        <p>&nbsp;</p> {/* For spacing alignment */}
        <p className="mt-2">
          Yang menerima Wakaf <br /> Pihak Kedua
        </p>
        <p className="mt-16 font-semibold">{wakif}</p>
      </div>
      <div className="text-center">
        <p className="text-right">
          Tasikmalaya, {formatIndonesianDate(new Date(createdAt), {
            withoutDayName: true,
            withoutTime: true
          })}
        </p>
        <p className="mt-2">
          Yang menyatakan Wakaf/Wakif <br /> Pihak Kesatu
        </p>
        <p className="mt-16 font-semibold">{recipient}</p>
      </div>
    </section>
  )
}

export default ContentFooter