import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaCertificate } from "react-icons/fa";

import useSidebarStore from "../_stores/useSidebarStore";

const NotificationDisplay: React.FC = () => {
  const { notificationDisplay, closeNotificationDisplay } = useSidebarStore();

  const notifications = [
    {
      id: 1,
      title: "Pembayaran Berhasil",
      message: "Terima kasih telah melakukan pembayaran untuk kampanye wakaf yang Anda pilih. Pembayaran Anda telah berhasil diproses. Sertifikat Anda akan segera dikirim ke email yang terdaftar.",
      time: "2 months ago",
      icon: <FaCheckCircle className="text-green-500" />
    },
    {
      id: 2,
      title: "Kampanye Baru",
      message: "Kami telah meluncurkan kampanye wakaf baru. Segera cek detailnya di halaman kampanye.",
      time: "1 month ago",
      icon: <FaInfoCircle className="text-blue-500" />
    },
    {
      id: 3,
      title: "Pembayaran Gagal",
      message: "Pembayaran Anda untuk kampanye wakaf gagal diproses. Silakan coba lagi atau hubungi dukungan pelanggan.",
      time: "2 weeks ago",
      icon: <FaExclamationCircle className="text-red-500" />
    },
    {
      id: 4,
      title: "Sertifikat Terkirim",
      message: "Sertifikat Anda telah dikirimkan dan ditambahkan ke halaman profil Anda. Terima kasih atas partisipasi Anda dalam kampanye wakaf.",
      time: "1 day ago",
      icon: <FaCertificate className="text-yellow-500" />
    }
  ];

  return (
    <Sheet open={notificationDisplay} onClose={closeNotificationDisplay}>
      <SheetContent className="overflow-y-auto max-h-screen"> {/* Make SheetContent scrollable */}
        <SheetHeader>
          <SheetTitle className="border-b pb-2">Notifikasi</SheetTitle>
          <SheetDescription>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center space-x-2 w-full rounded-lg">
                    <div className="bg-blue-500 p-3 rounded-xl">
                      <FaBell className="text-white text-xl" />
                    </div>
                    <div className="text-start">
                      <div className="text-lg font-semibold">Pesan</div>
                      <div className="text-xs text-gray-500">{notifications.length} pesan baru!</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 space-y-4 text-start">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-start space-x-3 border-b pb-3">
                        <div className="mt-1">{notification.icon}</div>
                        <div className="flex-1">
                          <div className="text-lg font-semibold">{notification.title}</div>
                          <div className="text-sm text-gray-700">{notification.message}</div>
                          <div className="text-xs text-gray-500">{notification.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationDisplay;
