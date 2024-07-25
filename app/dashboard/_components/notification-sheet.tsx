'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import useSidebarStore from "../_stores/useSidebarStore"
import { Notification } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { useCallback, useRef, useState } from "react"
import { Accordion } from "@/components/ui/accordion"
import NotificationCard from "./notification-card"
import axios, { AxiosError, CancelTokenSource } from "axios"
import useAxiosErrorToast from "@/hooks/useAxiosErrorToast"
import { VscLoading } from "react-icons/vsc"
import { toast } from "sonner"

interface IProps {
  data: Notification[];
  limit: number;
}

const NotificationSheet: React.FC<IProps> = ({ data, limit }) => {
  const [notifications, setNotifications] = useState(data);
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null)
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const { handleAxiosErrorToast } = useAxiosErrorToast()
  const observer = useRef<IntersectionObserver | null>()
  const {
    notificationDisplay,
    onOpenNotification,
    setUnreadNotification,
    decrementUnreadNotification
  } = useSidebarStore();

  const handleReadNotification = (id: string) => {
    axios.post(`/api/notification/${id}/read`);
    setNotifications((prev) => prev.map(item => item.id === id ? { ...item, isRead: true } : item));
    decrementUnreadNotification();
  }

  const handleReadAllNotifications = () => {
    axios.post('/api/notification/read-all');
    setNotifications((prev) => prev.map(item => ({ ...item, isRead: true })));
    setUnreadNotification(0);
  }

  const fetch = useCallback(() => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    axios
      .get(`/api/notification`, {
        params: { cursor, limit: limit },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.notifications.length === limit) {
          setCursor(res.data.notifications[res.data.notifications.length - 1].id);
          if (!hasMore) setHasMore(true);
        } else {
          setHasMore(false);
        }
        setNotifications((prev) => [...prev, ...res.data.notifications]);
      })
      .catch((error: AxiosError) => {
        setNotifications([]);
        setHasMore(false);
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            handleAxiosErrorToast(axiosError.response.status);
          } else {
            toast.error('Internal Error');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cursor]);

  const lastDataElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetch()
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <Sheet open={notificationDisplay} onOpenChange={onOpenNotification}>
      <SheetContent className="overflow-y-auto max-h-screen px-0">
        <SheetHeader className="text-left px-6 flex-row justify-between items-end py-2">
          <SheetTitle className="leading-none">Notifikasi</SheetTitle>
          <button className="text-xs text-secondary" onClick={handleReadAllNotifications}>
            Baca semua
          </button>
        </SheetHeader>
        <Separator />
        {data.length > 0 ? (
          <>
            <Accordion type="single" collapsible>
              {notifications.map((item, index) => {
                if (notifications.length === index + 1 && hasMore) return (
                  <NotificationCard
                    key={`notif-${index}`}
                    ref={lastDataElementRef}
                    data={item}
                    onClick={handleReadNotification}
                  />
                )

                return (
                  <NotificationCard
                    key={`notif-${index}`}
                    data={item}
                    onClick={handleReadNotification}
                  />
                )
              })}
            </Accordion>
            {loading && (
              <div className="p-4">
                <VscLoading fontSize={20} className="animate-spin mx-auto" />
              </div>
            )}
            {data.length > 0 && !hasMore && (
              <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
                Tidak ada lagi notifikasi
              </div>
            )}
          </>
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
