import { db } from "@/lib/db";

export const getAllNotifications = async (userId: string, config?: {
  limit?: number;
  cursor?: string | undefined;
}) => {
  const notificationUnreadCount = await db.notification.count({
    where: {
      userId,
      isRead: false
    }
  })

  const notifications = await db.notification.findMany({
    where: { userId },
    take: config?.limit || 10,
    skip: config?.cursor ? 1 : 0,
    cursor: config?.cursor ? { id: config.cursor } : undefined,
    orderBy: {
      createdAt: 'desc'
    },
  });

  return {
    unread: notificationUnreadCount,
    notifications
  }
}