import { UserRole } from "@prisma/client";
import { IconType } from "react-icons/lib";

type SidebarNavRole = UserRole | 'PUBLIC' | 'BOTH';
export interface SidebarNavItem {
  href: string;
  icon: IconType;
  text: string;
  role: SidebarNavRole
}

export interface SidebarNavDivider {
  type: "divider";
}

export type SidebarNavItems = SidebarNavItem | SidebarNavDivider;