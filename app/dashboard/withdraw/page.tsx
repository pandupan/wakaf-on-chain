import FormWithdraw from "./_components/form-withdraw"
import HistoryWithdraw from "./_components/history-withdraw"

function WithdrawPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-7 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-gradient-to-tr from-secondary to-lime-400 text-secondary-foreground">
            <h4 className="text-xs sm:text-sm">Wakaf Tersedia</h4>
            <h3 className="text-xl sm:text-2xl font-bold">Rp150.000.000</h3>
          </div>
          <div className="p-6 rounded-xl shadow-sm bg-background">
            <h4 className="text-xs sm:text-sm">Bisa Dicairkan Dari</h4>
            <h3 className="text-xl sm:text-2xl font-bold text-secondary">6 Kampanye</h3>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-r from-violet-400 to-sky-400 text-secondary-foreground">
            <h4 className="text-xs sm:text-sm">Berhasil Tercairkan</h4>
            <h3 className="text-xl sm:text-2xl font-bold">Rp50.000.000</h3>
          </div>
          <div className="p-6 rounded-xl shadow-sm bg-background">
            <h4 className="text-xs sm:text-sm">Total Pemasukan</h4>
            <h3 className="text-xl sm:text-2xl font-bold text-secondary">Rp205.000.000</h3>
          </div>
        </div>
        <div className="lg:hidden">
          <FormWithdraw />
        </div>
        <HistoryWithdraw />
      </div>
      <div className="col-span-5 hidden lg:block">
        <FormWithdraw />
      </div>
    </div>
  )
}

export default WithdrawPage