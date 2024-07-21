import { formatRupiah, indonesiaRelativeTime } from "@/lib/utils";
import { FaUser } from "react-icons/fa"

interface IProps {
  campaignId: number;
  data: {
    user: {
      id: string;
      image: string | null;
      name: string | null;
    } | null;
    id: string;
    updatedAt: Date;
    name: string;
    isHiddenName: boolean;
    amount: number;
  }[];
  totalWakif: number;
}

const WakifList: React.FC<IProps> = ({ campaignId, data, totalWakif }) => {
  return (
    <div className="bg-background rounded-md shadow-sm p-4 space-y-4 sticky top-0">
      <div className="flex gap-2 items-center">
        <h2 className="text-lg sm:text-xl font-bold">
          Wakif
        </h2>
        <span className="inline-block rounded-full bg-secondary text-white px-3 py-[2px] text-sm">
          {totalWakif}
        </span>
      </div>
      <div className="space-y-4">
        {data.map((wakif) => (
          <div
            key={wakif.id}
            className="flex items-center gap-4 bg-gray-50 border px-4 py-3 rounded-lg shadow-sm"
          >
            <div className="w-10 sm:w-12 aspect-square rounded-full bg-gray-100 border overflow-hidden">
              <img
                src={wakif.user?.image || ''}
                alt="profile image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold">
                {wakif.isHiddenName ? 'Anonim' : wakif.name}
              </h3>
              <h5 className="text-gray-600 text-sm sm:text-base font-semibold text-secondary tracking-wide">
                {formatRupiah(wakif.amount)}
              </h5>
              <span className="block text-gray-400 text-xs sm:text-sm">
                {indonesiaRelativeTime(new Date(wakif.updatedAt))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WakifList;
