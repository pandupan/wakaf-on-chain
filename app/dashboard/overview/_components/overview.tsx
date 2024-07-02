import React from 'react';
import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandHoldingUsd, FaUserAlt } from 'react-icons/fa';
import { HiOutlineTrophy, HiOutlineChartBar } from "react-icons/hi2";
import { MdCampaign, MdEventNote } from "react-icons/md";
import { BiTrendingUp } from "react-icons/bi";
import CardOverview from '../../../../components/shared/overview-card';

function Overview() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardOverview
        Icon={FaUserAlt}
        title="Total Pengguna"
        value="200"
      />
      <CardOverview
        Icon={FaHandHoldingUsd}
        title="Jumlah Donatur"
        value="170"
      />
      <CardOverview
        Icon={FaHandHoldingUsd}
        title="Total Uang Wakaf"
        value="Rp1.200.000"
      />
      <CardOverview
        Icon={BsCurrencyDollar}
        title="Donasi Rata-rata"
        value="Rp200.000"
      />
      <CardOverview
        Icon={MdCampaign}
        title="Kampanye Aktif"
        value="3"
      />
      <CardOverview
        Icon={HiOutlineTrophy}
        title="Kampanye Selesai"
        value="7"
      />
      {/* <CardOverview
        Icon={HiOutlineChartBar}
        title="Skala Aktivitas Wakaf"
        value="80%"
      />
      <CardOverview
        Icon={BiTrendingUp}
        title="Perkembangan wakaf"
        value="Meningkat 20%"
      />
      <CardOverview
        Icon={MdEventNote}
        title="Aktivitas Terbaru"
        value="5 Donasi Terbaru"
      /> */}
    </div>
  );
}

export default Overview;
