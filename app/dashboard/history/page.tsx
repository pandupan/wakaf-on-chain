import InputSearch from "@/components/core/input-search"
import CardHistoryWakaf from "./_components/card-history-wakaf"

function HistoryPage() {
  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <InputSearch placeholder="Cari riwayat wakaf" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        <CardHistoryWakaf />
        <CardHistoryWakaf />
        <CardHistoryWakaf />
        <CardHistoryWakaf />
        <CardHistoryWakaf />
        <CardHistoryWakaf />
      </div>
    </div>
  )
}

export default HistoryPage