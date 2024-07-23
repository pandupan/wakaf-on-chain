'use client'

import { Accordion } from "@/components/ui/accordion"
import NotificationCard from "./notification-card"
import { Notification } from "@prisma/client"
import { useState } from "react";

interface IProps {
  data: Notification[];
}

function NotificationList({ data }: IProps) {
  const [notifications, setNotifications] = useState(data);

  return (
    <Accordion type="single" collapsible>
      {notifications.map((item, index) => (
        <NotificationCard
          data={item}
          key={`notif-${index}`}
        />
      ))}
    </Accordion>
  )
}

export default NotificationList