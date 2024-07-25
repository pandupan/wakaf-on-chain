import { HeaderBreadcrumb } from './header-breadcrumb'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { User } from '@prisma/client'
import { abbreviateName, getInitials } from '@/lib/utils'
import NotificationSheet from './notification-sheet'
import ButtonSidebar from './button-sidebar'
import ButtonNotification from './button-notification'
import { getAllNotifications } from '@/data/notification'

interface IProps {
  user: User | null;
}

const LIMIT = 15;

async function Header({ user }: IProps) {
  const notifications = !!user ?
    await getAllNotifications(user.id, { role: user.role, limit: LIMIT }) : null;

  return (
    <div className="flex flex-col-reverse md:flex-row md:items-end gap-x-2 gap-y-4 justify-between pb-4">
      <HeaderBreadcrumb />
      <div className="flex items-center gap-2 self-end md:self-auto">
        {!!user && (
          <div className="flex gap-2 items-center p-1.5 rounded-full bg-background shadow-xl shadow-foreground/5">
            <ButtonNotification unread={notifications?.unread || 0} />
            <div className="flex gap-2 items-center">
              <p className="text-sm">
                Halo,
                <b>
                  <span className="hidden sm:inline"> {user.name}</span>
                  <span className="sm:hidden"> {abbreviateName(user.name || '')}</span>
                </b>
              </p>
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.image || ''} alt="profile image" />
                <AvatarFallback>{getInitials(user.name!)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        )}
        <ButtonSidebar />
      </div>
      {notifications !== null && (
        <NotificationSheet
          data={notifications.notifications}
          limit={LIMIT}
        />
      )}
    </div>
  )
}

export default Header
