import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FaBell,
  FaCheck,
  FaCheckCircle,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "Pembayaran Berhasil",
    message:
      "Terima kasih telah melakukan pembayaran untuk kampanye wakaf yang Anda pilih. Pembayaran Anda telah berhasil diproses. Sertifikat Anda akan segera dikirim ke email yang terdaftar.",
    time: "2 months ago",
    icon: <FaCheckCircle className="text-green-500" />,
  },
];

function NotificationList() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center space-x-3 w-full rounded-lg">
            <div className="relative">
              <div className="bg-emerald-500 p-3 rounded-xl">
                <FaCheck className="text-white sm:text-xl" />
              </div>
            </div>
            <div className="text-start">
              <h2 className="text-sm sm:text-base font-semibold leading-4">
                Aktivitas Wakaf
              </h2>
              <span className="text-[10px] sm:text-xs text-gray-500">
                {notifications[0].time}
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 space-y-1 border rounded-lg">
            <h2 className="text-sm sm:text-base font-semibold text-black">
              {notifications[0].title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-700">
              {notifications[0].message}
            </p>
            <span className="text-[10px] sm:text-xs text-gray-500">
              {notifications[0].time}
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default NotificationList