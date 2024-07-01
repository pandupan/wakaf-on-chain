import CardCampaign from '@/components/shared/card-campaign'
import React from 'react'

function CampaignPage() {
  return (
    <>
      <div className="w-full rounded-lg bg-secondary p-4 sm:p-10 space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-background max-w-5xl leading-snug">
          Yukk, mari kita berbagi dan tunjukan kepedulian terhadap sesama manusia.
        </h1>
        <h2 className="text-xl sm:text-3xl font-bold text-gray-800 max-w-5xl tracking-wider">
          #BantuSesama
        </h2>
        <div className="p-4 rounded-md bg-muted">
          <p className="text-xs">
            <b>Disclaimer:</b> Kampanye ini diadakan secara resmi oleh pengurus dari Pondok Pesantren Mahasiswa Al-Ihsan dan menjadi tanggung jawabnya. Jika ada masalah atau kecurigaan silahkan <a href="#" className="text-secondary underline">laporkan kepada kami.</a>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        <CardCampaign />
        <CardCampaign />
        <CardCampaign />
        <CardCampaign />
        <CardCampaign />
        <CardCampaign />
      </div>
    </>
  )
}

export default CampaignPage