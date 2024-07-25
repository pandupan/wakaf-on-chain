import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getAllNotifications = async (userId: string, config?: {
  limit?: number;
  cursor?: string | undefined;
  role: UserRole
}) => {
  const role = config?.role || 'USER';

  let whereQuery: any;

  switch (role) {
    case 'SUPER_ADMIN':
      whereQuery = {
        OR: [
          { userId },
          { userId: null, role: 'SUPER_ADMIN' },
          { userId: null, role: 'ADMIN' }
        ]
      }
      break;
    case 'ADMIN':
      whereQuery = {
        OR: [
          { userId },
          { userId: null, role: 'ADMIN' }
        ]
      }
      break;
    case 'USER':
    default:
      whereQuery = { userId }
      break;
  }

  const notificationUnreadCount = await db.notification.count({
    where: {
      ...whereQuery,
      isRead: false,
    }
  })

  const notifications = await db.notification.findMany({
    where: whereQuery,
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