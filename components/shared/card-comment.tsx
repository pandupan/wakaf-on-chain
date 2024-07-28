import { indonesiaRelativeTime } from '@/lib/utils';
import React, { forwardRef } from 'react'

interface IProps {
  image: string;
  name: string;
  content: string;
  createdAt: Date;
}

const CardComment = forwardRef<HTMLDivElement, IProps>(({ content, createdAt, image, name }, ref) => {
  return (
    <div ref={ref}>
      <div className="flex items-center gap-2">
        <div className="w-10 sm:w-12 aspect-square rounded-full bg-muted overflow-hidden">
          <img
            src={image}
            alt="user profile"
          />
        </div>
        <p className="w-full font-bold text-xs sm:text-base">{name}</p>
      </div>
      <p className="text-gray-700 mt-2 text-sm sm:text-sm">
        {content}
      </p>
      <span className="text-xs text-gray-500">
        {indonesiaRelativeTime(new Date(createdAt))}
      </span>
    </div>
  )
})

CardComment.displayName = "CardComment"

export default CardComment