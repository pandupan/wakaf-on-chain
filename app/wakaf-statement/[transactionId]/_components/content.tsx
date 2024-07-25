import React from 'react'
import ContentWakif from './content-wakif'
import ContentRecipient from './content-recipient'
import ContentFooter from './content-footer'
import { Campaign, Transaction, User } from '@prisma/client'
import { formatIndonesianDate, formatRupiah } from '@/lib/utils'

interface IProps {
  data: {
    recipient: User;
    transaction: Transaction & {
      user?: User | null;
      campaign?: Campaign
    };
  }
}

function Content({ data }: IProps) {
  const { transaction } = data;

  return (
    <div className="text-xs sm:text-sm">
      <ContentWakif data={data.transaction.user!} />
      <ContentRecipient data={data.recipient} />
      <section className="mb-4 text-justify space-y-2">
        <p className="indent-10">
          Dengan ini menyatakan bahwa pihak ke satu telah sepakat <b>menyerahkan/mewakafkan</b> uang
          senilai <b>{formatRupiah(transaction.amount)}</b> pada tanggal{" "}
          {formatIndonesianDate(new Date(transaction.createdAt))} untuk kepentingan pembangunan
          <b><i>{`"${transaction.campaign?.title}"`} </i></b>
          Pondok Pesantren Mahasiswa Al-Ihsan Kota Tasikamalaya kepada pihak ke dua berikut
          dokumen administrasinya.
        </p>
        <p className="indent-10">
          Demikian surat pernyataan ini dibuat dengan sebenarnya dan untuk dipergunakan sebagaimana mestinya.
        </p>
      </section>
      <ContentFooter
        wakif={transaction.user!.name!}
        recipient={data.recipient.name!}
        createdAt={transaction.createdAt}
      />
    </div>
  )
}

export default Content