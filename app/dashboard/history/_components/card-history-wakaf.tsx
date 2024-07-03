import { Button } from '@/components/ui/button'

function CardHistoryWakaf() {
  return (
    <div className="bg-background rounded-md shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 p-4">
      <div className="sm:col-span-2 flex items-end justify-between gap-2">
        <h3 className="text-sm">
          ID Transaksi: <b>#129</b>
        </h3>
        <span className="block text-[10px] leading-3 text-gray-400 text-right">
          Rabu, 3 Juni 2024 02:56
        </span>
      </div>
      <div className="w-full aspect-[4/3] rounded-md overflow-hidden">
        <img
          src="https://picsum.photos/id/83/1600/900"
          className="w-full h-full"
          alt="campaign 1"
        />
      </div>
      <div className="sm:space-y-1">
        <h2 className="text-sm font-bold">
          Wakaf untuk kebutuhan mesjid al ihsan tasikmalaya
        </h2>
        <div>
          <h5 className="text-xs text-gray-700 font-semibold">
            Berwakaf sebesar
          </h5>
          <span className="block text-sm text-secondary font-bold">Rp100.000</span>
        </div>
        <div className="flex justify-between items-end text-gray-700 pt-1">
          <div>
            <h4 className="text-xs leading-3">Donator ke</h4>
            <span className="block font-semibold text-xs sm:text-sm">89</span>
          </div>
          <div className="text-right">
            <h4 className="text-xs leading-3">Metode</h4>
            <span className="block font-semibold text-xs sm:text-sm">DANA</span>
          </div>
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button size="sm" variant="outline" className="w-full text-xs flex-1">
            Detail Kampanye
          </Button>
          <Button size="sm" variant="secondary" className="w-full text-xs flex-1">
            Sertikat
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CardHistoryWakaf