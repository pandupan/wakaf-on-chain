import { HTMLRenderer } from '@/components/core/html-renderer';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { cn, formatIndonesianDate, indonesiaRelativeTime } from '@/lib/utils'
import { Notification } from '@prisma/client'
import { forwardRef } from 'react'
import { FaCheck, FaExclamation, FaRegClock } from 'react-icons/fa6'
import { FiAlertTriangle } from 'react-icons/fi'
import { IoNotifications } from 'react-icons/io5'
import { GoVerified } from "react-icons/go"
import { MouseEvent } from 'react'

interface IProps {
  data: Notification;
  onClick: (id: string) => void;
  onClickLink?: (link: MouseEvent<HTMLAnchorElement>['target']) => void;
}

const NotificationCard = forwardRef<HTMLDivElement, IProps>(({ data, onClick, onClickLink }, ref) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.tagName === 'A' && onClickLink) {
      onClickLink(target);
    }
  };

  const renderIcon = () => {
    switch (data.type) {
      case 'VERIFIED':
        return (
          <div className="bg-secondary p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <GoVerified className="text-white sm:text-xl" />
          </div>
        )
      case 'GENERAL':
        return (
          <div className="bg-gray-800 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <IoNotifications className="text-white text-sm sm:text-xl" />
          </div>
        )
      case 'PENDING':
        return (
          <div className="bg-blue-500 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <FaRegClock className="text-white text-sm sm:text-xl" />
          </div>
        )
      case 'WARNING':
        return (
          <div className="bg-orange-500 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <FiAlertTriangle className="text-white text-sm sm:text-xl" />
          </div>
        )
      case 'ERROR':
        return (
          <div className="bg-destructive p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <FaExclamation className="text-white text-sm sm:text-xl" />
          </div>
        )
      case 'SUCCESS':
      default:
        return (
          <div className="bg-emerald-500 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <FaCheck className="text-white text-sm sm:text-xl" />
          </div>
        )
    }
  }

  return (
    <AccordionItem
      ref={ref}
      value={data.id}
      className={cn('px-6', !data.isRead && 'bg-gray-100')}
    >
      <AccordionTrigger
        className="hover:no-underline"
        onClick={() => {
          if (!data.isRead) onClick(data.id);
        }}
      >
        <div className="flex items-center space-x-3 w-full rounded-lg">
          <div className="relative">
            {renderIcon()}
          </div>
          <div className="text-start">
            <h2 className="text-sm sm:text-base font-semibold leading-4">
              {data.title}
            </h2>
            <span className="text-[10px] sm:text-xs text-gray-500">
              {indonesiaRelativeTime(data.createdAt)}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="p-4 space-y-1 border rounded-lg">
          <HTMLRenderer
            htmlString={data.message}
            className="notif-card-message text-xs sm:text-sm text-gray-700 text-justify"
            onClick={handleClick}
          />
          <span className="block text-xs text-gray-500 text-right">
            {formatIndonesianDate(new Date(data.createdAt))}
          </span>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
})

NotificationCard.displayName = "NotificationCard"

export default NotificationCard