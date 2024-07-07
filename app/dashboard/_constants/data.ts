import { AiOutlineHome, AiOutlineTrophy } from 'react-icons/ai'
import { TbMoneybag } from "react-icons/tb"
import { LuUser2 } from "react-icons/lu"
import { LiaDonateSolid } from "react-icons/lia"
import { MdInsertChartOutlined, MdOutlineCampaign } from 'react-icons/md'
import { RiHeartAddLine } from "react-icons/ri"
import { PiHandCoins } from "react-icons/pi"
import { BiNotepad } from 'react-icons/bi'
import { IoWalletOutline } from 'react-icons/io5'

import { SidebarNavItems } from '@/lib/types'

export const sidebarNavItems: SidebarNavItems[] = [
  {
    href: "/dashboard/overview",
    icon: MdInsertChartOutlined,
    text: "Overview",
    role: 'ADMIN'
  },
  {
    href: "/dashboard/campaign-management",
    icon: BiNotepad,
    text: "Kelola Kampanye",
    role: 'ADMIN'
  },
  {
    href: "/dashboard/wakif",
    icon: PiHandCoins,
    text: "Daftar Wakif",
    role: 'ADMIN'
  },
  {
    href: "/dashboard/add-campaign",
    icon: RiHeartAddLine,
    text: "Buat Kampanye",
    role: 'ADMIN'
  },
  {
    href: "/dashboard/withdraw",
    icon: IoWalletOutline,
    text: "Saldo Wakaf",
    role: 'ADMIN'
  },
  {
    type: "divider",
  },
  {
    href: "/dashboard",
    icon: AiOutlineHome,
    text: "Beranda",
    role: 'USER'
  },
  {
    href: "/dashboard/berwakaf",
    icon: LiaDonateSolid,
    text: "Berwakaf",
    role: 'USER'
  },
  {
    href: "/dashboard/campaign",
    icon: MdOutlineCampaign,
    text: "Kampanye",
    role: 'PUBLIC'
  },
  {
    href: "/dashboard/history",
    icon: TbMoneybag,
    text: "Riwayat Wakaf",
    role: 'USER'
  },
  {
    href: "/dashboard/leaderboard",
    icon: AiOutlineTrophy,
    text: "Papan Peringkat",
    role: 'PUBLIC'
  },
  {
    type: "divider",
  },
  {
    href: "/dashboard/profile",
    icon: LuUser2,
    text: "Profil",
    role: 'BOTH'
  },
];

export const wakafCategories = [
  { id: 1, value: 'pendidikan', label: 'Pendidikan' },
  { id: 2, value: 'kesehatan', label: 'Kesehatan' },
  { id: 3, value: 'masjid', label: 'Masjid' },
  { id: 4, value: 'infrastruktur', label: 'Infrastruktur' },
  { id: 5, value: 'sosial', label: 'Sosial' },
  { id: 6, value: 'lingkungan', label: 'Lingkungan' },
  { id: 7, value: 'ekonomi', label: 'Ekonomi' },
  { id: 8, value: 'lainnya', label: 'Lainnya' },
];