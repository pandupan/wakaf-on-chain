import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { indonesiaRelativeTime } from "@/lib/utils";
import {
  FaCheck,
} from "react-icons/fa";

const notifications = [
  {
    id: "1",
    userId: "user-1",
    campaignId: 101,
    transactionId: "trans-1",
    role: "USER",
    type: "SUCCESS",
    message: "Pembayaran Berhasil. Terima kasih telah melakukan pembayaran untuk kampanye wakaf yang Anda pilih. Pembayaran Anda telah berhasil diproses. Sertifikat Anda akan segera dikirim ke email yang terdaftar.",
    isRead: false,
    createdAt: new Date(),
    title: "Pembayaran Berhasil",
  },
  {
    id: "2",
    userId: "user-2",
    campaignId: 102,
    transactionId: "trans-2",
    role: "USER",
    type: "PENDING",
    message: "Pembayaran Anda sedang diproses. Mohon tunggu beberapa saat.",
    isRead: false,
    createdAt: new Date(),
    title: "Pembayaran Pending",
  },
  {
    id: "3",
    userId: "user-3",
    campaignId: 103,
    transactionId: "trans-3",
    role: "USER",
    type: "ERROR",
    message: "Pembayaran Gagal. Mohon periksa metode pembayaran Anda dan coba lagi.",
    isRead: false,
    createdAt: new Date(),
    title: "Pembayaran Gagal",
  },
];

function NotificationList() {
  return (
    <Accordion type="single" collapsible>
      {notifications.map((item, index) => (
        <AccordionItem value={item.id} key={`notif-${index}`}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-3 w-full rounded-lg">
              <div className="relative">
                <div className="bg-emerald-500 p-3 rounded-xl">
                  <FaCheck className="text-white sm:text-xl" />
                </div>
              </div>
              <div className="text-start">
                <h2 className="text-sm sm:text-base font-semibold leading-4">
                  {item.title}
                </h2>
                <span className="text-[10px] sm:text-xs text-gray-500">
                  {indonesiaRelativeTime(item.createdAt)}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 space-y-1 border rounded-lg">
              <h2 className="text-sm sm:text-base font-semibold text-black">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-700">
                {item.message}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default NotificationList