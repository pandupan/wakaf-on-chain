'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import NotificationList from "./notification-list"
import useSidebarStore from "../_stores/useSidebarStore"
import { Notification } from "@prisma/client"

interface IProps {
  data: Notification[];
}

const NotificationSheet: React.FC<IProps> = ({ data }) => {
  const { notificationDisplay, onOpenNotification } = useSidebarStore();

  return (
    <Sheet open={notificationDisplay} onOpenChange={onOpenNotification}>
      <SheetContent className="overflow-y-auto max-h-screen">
        <SheetHeader className="text-left">
          <SheetTitle className="border-b pb-2">Notifikasi</SheetTitle>
        </SheetHeader>
        {data.length > 0 ? (
          <NotificationList data={data} />
        ) : (
          <div className="h-[100px] flex justify-center items-center">
            <p className="text-sm sm:text-base">Tidak ada notifikasi.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;
