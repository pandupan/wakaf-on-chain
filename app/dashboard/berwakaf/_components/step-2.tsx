import { forwardRef } from 'react'
import { IoCheckmark } from 'react-icons/io5'

const Step2 = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">2</span>
        <h1 className="text-lg font-bold">Pilih metode wakaf</h1>
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-sm">E-Wallet dan QRIS</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="relative cursor-pointer rounded-lg border-2 border-secondary">
            <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
              Dana
              <IoCheckmark className="absolute top-[50%] -translate-y-[50%] right-4 text-xl text-secondary" />
            </div>
          </div>
          <div className="cursor-pointer rounded-lg border">
            <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
              QRIS
            </div>
          </div>
          <div className="cursor-pointer rounded-lg border">
            <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
              LinkAja
            </div>
          </div>
          <div className="cursor-pointer rounded-lg border">
            <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
              ShoopePay
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-sm">Virtual Account</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="cursor-pointer rounded-lg border">
            <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
              BRIVA
            </div>
          </div>
          <div className="cursor-pointer rounded-lg border">
            <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
              BCA Virtual Account
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Step2