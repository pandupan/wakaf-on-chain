import { AiOutlineHome, AiOutlineTrophy } from 'react-icons/ai'
import { TbMoneybag } from "react-icons/tb"
import { LuUser2 } from "react-icons/lu"
import { LiaDonateSolid } from "react-icons/lia"
import { MdInsertChartOutlined, MdOutlineCampaign } from 'react-icons/md'
import { RiHeartAddLine } from "react-icons/ri"
import { PiHandCoins } from "react-icons/pi"
import { BiNotepad } from 'react-icons/bi'
import { IoWalletOutline } from 'react-icons/io5'

export const sidebarNavItems = [
  {
    href: "/dashboard/overview",
    icon: MdInsertChartOutlined,
    text: "Overview",
  },
  {
    href: "/dashboard/campaign-management",
    icon: BiNotepad,
    text: "Kelola Kampanye",
  },
  {
    href: "/dashboard/wakif-history",
    icon: PiHandCoins,
    text: "Daftar Wakif",
  },
  {
    href: "/dashboard/add",
    icon: RiHeartAddLine,
    text: "Buat Kampanye",
  },
  {
    href: "/dashboard/withdraw",
    icon: IoWalletOutline,
    text: "Saldo Wakaf",
  },
  {
    type: "divider",
  },
  {
    href: "/dashboard",
    icon: AiOutlineHome,
    text: "Beranda",
  },
  {
    href: "/dashboard/berwakaf",
    icon: LiaDonateSolid,
    text: "Berwakaf",
  },
  {
    href: "/dashboard/campaign",
    icon: MdOutlineCampaign,
    text: "Kampanye",
  },
  {
    href: "/dashboard/history",
    icon: TbMoneybag,
    text: "Riwayat Wakaf",
  },
  {
    href: "/dashboard/leaderboard",
    icon: AiOutlineTrophy,
    text: "Papan Peringkat",
  },
  {
    type: "divider",
  },
  {
    href: "/dashboard/profile",
    icon: LuUser2,
    text: "Profil",
  },
];