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
import { FaBell, FaCheckCircle, FaExclamationCircle, FaCertificate, FaFlag, FaCheck, FaTrophy } from "react-icons/fa";
import { MdOutlineCampaign } from "react-icons/md"; 
import { BiSolidNews } from "react-icons/bi";


import useSidebarStore from "../_stores/useSidebarStore";

const NotificationSheet: React.FC = () => {
  const { notificationDisplay, onOpenNotification } = useSidebarStore();

  const notifications = [
    {
      id: 1,
      title: "Pembayaran Berhasil",
      message: "Terima kasih telah melakukan pembayaran untuk kampanye wakaf yang Anda pilih. Pembayaran Anda telah berhasil diproses. Sertifikat Anda akan segera dikirim ke email yang terdaftar.",
      time: "2 months ago",
      icon: <FaCheckCircle className="text-green-500" />,
      smallIcon: <FaCheckCircle className="text-green-500" />
    },
    {
      id: 2,
      title: "Kampanye Baru",
      message: "Kami telah meluncurkan kampanye wakaf baru. Segera cek detailnya di halaman kampanye.",
      time: "1 month ago",
      icon: <BiSolidNews className="text-blue-500" />, // Changed icon for new campaign
      smallIcon: <BiSolidNews className="text-blue-500" /> // Changed small icon for new campaign
    },
    {
      id: 3,
      title: "Pembayaran Gagal",
      message: "Pembayaran Anda untuk kampanye wakaf gagal diproses. Silakan coba lagi atau hubungi dukungan pelanggan.",
      time: "2 weeks ago",
      icon: <FaExclamationCircle className="text-red-500" />,
      smallIcon: <FaExclamationCircle className="text-red-500" />
    },
    {
      id: 4,
      title: "Sertifikat Terkirim",
      message: "Sertifikat Anda telah dikirimkan dan ditambahkan ke halaman profil Anda. Terima kasih atas partisipasi Anda dalam kampanye wakaf.",
      time: "1 day ago",
      icon: <FaCertificate className="text-yellow-500" />,
      smallIcon: <FaCertificate className="text-yellow-500" />
    },
    {
      id: 5,
      title: "Kampanye Selesai",
      message: "Kampanye wakaf yang Anda ikuti telah selesai. Terima kasih atas partisipasi Anda.",
      time: "3 days ago",
      icon: <FaTrophy className="text-yellow-500" />,
      smallIcon: <FaTrophy className="text-yellow-500" />
    },
  ];

  return (
    <Sheet open={notificationDisplay} onOpenChange={onOpenNotification}>
      <SheetContent className="overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle className="border-b pb-2">Notifikasi</SheetTitle>
          <SheetDescription>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center space-x-3 w-full rounded-lg">
                    <div className="relative">
                      <div className="bg-blue-500 p-3 rounded-xl">
                        <FaBell className="text-white text-xl" />
                      </div>
                      <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
                        {notifications[0].smallIcon}
                      </div>
                    </div>
                    <div className="text-start">
                      <h2 className="sm:text-lg font-semibold">Aktivitas Wakaf</h2>
                      <span className="text-xs text-gray-500">{notifications[0].time}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 space-y-4 text-start">
                    <div key={notifications[0].id} className="flex items-start space-x-3 border-b pb-3">
                      <span className="mt-1">{notifications[0].icon}</span>
                      <div className="flex-1">
                        <h2 className="sm:text-lg font-semibold text-black mb-2">{notifications[0].title}</h2>
                        <p className="text-sm text-gray-700">{notifications[0].message}</p>
                        <span className="text-xs text-gray-500">{notifications[0].time}</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-campaigns">
                <AccordionTrigger>
                  <div className="flex items-center space-x-3 w-full rounded-lg">
                    <div className="relative">
                      <div className="bg-blue-500 p-3 rounded-xl">
                        <MdOutlineCampaign className="text-white text-xl" /> {/* Icon for new campaign */}
                      </div>
                      <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
                        {notifications[1].smallIcon}
                      </div>
                    </div>
                    <div className="text-start">
                      <h2 className="sm:text-lg font-semibold">Informasi Kampanye</h2>
                      <span className="text-xs text-gray-500">{notifications[1].time}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 space-y-4 text-start">
                    <div key={notifications[1].id} className="flex items-start space-x-3 border-b pb-3">
                      <span className="mt-1">{notifications[1].icon}</span>
                      <div className="flex-1">
                        <h2 className="sm:text-lg font-semibold text-black mb-2">{notifications[1].title}</h2>
                        <p className="text-sm text-gray-700">{notifications[1].message}</p>
                        <span className="text-xs text-gray-500">{notifications[1].time}</span>
                      </div>
                    </div>
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

export default NotificationSheet;
