import { formatRupiah, indonesiaRelativeTime } from "@/lib/utils";
import { WakifItem } from "./wakif-list";
import { forwardRef } from "react";

interface IProps {
  data: WakifItem;
}

const CardWakifList = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center gap-4 bg-gray-50 border px-4 py-3 rounded-lg shadow-sm"
    >
      <div className="w-10 sm:w-12 aspect-square rounded-full bg-gray-100 border overflow-hidden">
        <img
          src={data.user?.image || ''}
          alt="profile image"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-sm sm:text-base font-bold">
          {data.isHiddenName ? 'Anonim' : data.name}
        </h3>
        <h5 className="text-gray-600 text-sm sm:text-base font-semibold text-secondary tracking-wide">
          {formatRupiah(data.amount)}
        </h5>
        {data.message && (
          <p className="text-xs sm:text-sm italic">
            {`"${data.message}"`}
          </p>
        )}
        <span className="block text-gray-400 text-xs sm:text-sm">
          {indonesiaRelativeTime(new Date(data.updatedAt))}
        </span>
      </div>
    </div>
  )
})

CardWakifList.displayName = "CardWakifList"

export default CardWakifList