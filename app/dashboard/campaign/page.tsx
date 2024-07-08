import React from 'react'
import CampaignList from './_components/campaign-list'
import { getAllCampaigns } from '@/data/campaign'
import { redirect } from 'next/navigation';

async function CampaignPage() {
  const campaigns = await getAllCampaigns();

  if (campaigns === null) redirect('/error');

  return (
    <>
      <div className="w-full rounded-lg bg-gradient-to-tr from-secondary to-blue-500 p-4 sm:p-10 space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-background max-w-5xl leading-snug">
          Yukk, mari kita berbagi dan tunjukan kepedulian terhadap sesama manusia.
        </h1>
        <h2 className="text-xl sm:text-3xl font-extrabold text-gray-800 max-w-5xl tracking-wider">
          #BantuSesama
        </h2>
        <div className="p-4 rounded-md bg-muted">
          <p className="text-xs">
            <b>Disclaimer:</b> Kampanye ini diadakan secara resmi oleh pengurus dari Pondok Pesantren Mahasiswa Al-Ihsan dan menjadi tanggung jawabnya. Jika ada masalah atau kecurigaan silahkan <a href="#" className="text-secondary underline">laporkan kepada pihak pengembang.</a>
          </p>
        </div>
      </div>
      <CampaignList data={campaigns} />
    </>
  )
}

export default CampaignPage