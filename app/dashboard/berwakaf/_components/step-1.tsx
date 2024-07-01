import { Input } from '@/components/ui/input'

function Step1() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">1</span>
        <h1 className="text-lg font-bold">Pilih nominal</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="cursor-pointer hover:bg-muted rounded-lg border transition">
          <div className="flex items-center gap-2 p-4 shadow-sm text-lg sm:text-xl font-extrabold">
            <span className="text-3xl sm:text-4xl">😍</span>
            Rp20.000
          </div>
        </div>
        <div className="cursor-pointer hover:bg-muted rounded-lg border transition">
          <div className="flex items-center gap-2 p-4 shadow-sm text-lg sm:text-xl font-extrabold">
            <span className="text-3xl sm:text-4xl">🥰</span>
            Rp50.000
          </div>
        </div>
      </div>
      <div className="border p-4 rounded-lg space-y-2">
        <h2>Nominal wakaf lainnya</h2>
        <label className="relative block bg-gray-100 rounded-md">
          <span className="absolute left-4 top-[50%] -translate-y-[50%] font-extrabold text-lg sm:text-xl">
            Rp
          </span>
          <Input
            className="pl-14 pr-4 py-3 h-auto text-right font-extrabold text-xl sm:text-2xl bg-transparent border-0 focus-visible:ring-transparent focus-visible:ring-0"
            placeholder="0"
          />
        </label>
        <span className="block text-xs font-semibold text-gray-400">
          Minimal wakaf sebesar Rp20.000<sup>*</sup>
        </span>
      </div>
    </div>
  )
}

export default Step1