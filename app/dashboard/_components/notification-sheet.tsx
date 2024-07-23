'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import useSidebarStore from "../_stores/useSidebarStore";
import NotificationList from "./notification-list";

const NotificationSheet: React.FC = () => {
  const { notificationDisplay, onOpenNotification } = useSidebarStore();

  return (
    <Sheet open={notificationDisplay} onOpenChange={onOpenNotification}>
      <SheetContent className="overflow-y-auto max-h-screen">
        <SheetHeader className="text-left">
          <SheetTitle className="border-b pb-2">Notifikasi</SheetTitle>
        </SheetHeader>
        <NotificationList />
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;
