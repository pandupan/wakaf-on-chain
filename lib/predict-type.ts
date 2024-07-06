import {
  SidebarNavDivider,
  SidebarNavItems
} from "./types";

export function isDivider(item: SidebarNavItems): item is SidebarNavDivider {
  return (item as SidebarNavDivider).type === "divider";
}