import React from 'react'
import { IoCheckmark } from 'react-icons/io5'

function WithdrawStep3() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">3</span>
        <h1 className="text-lg font-bold">Pilih metode pencairan</h1>
      </div>
      <div className="space-y-3">
        <div className="relative p-3 border-2 border-secondary flex justify-between gap-2 rounded-lg cursor-pointer">
          <div className="w-[100px] aspect-video rounded-md bg-muted"></div>
          <div className="flex-auto flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold">BRI</h2>
              <span className="block text-secondary font-bold tracking-wide">
                320810018
              </span>
            </div>
            <h6 className="text-xs text-gray-600">a.n Aam Hermansyah</h6>
          </div>
          <IoCheckmark className="absolute top-[50%] -translate-y-[50%] right-4 text-xl text-secondary" />
        </div>
        <div className="p-3 border flex justify-between gap-2 rounded-lg cursor-pointer">
          <div className="w-[100px] aspect-video rounded-md bg-muted"></div>
          <div className="flex-auto flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold">DANA</h2>
              <span className="block text-secondary font-bold tracking-wide">
                082316126499
              </span>
            </div>
            <h6 className="text-xs text-gray-600">a.n Aam Hermansyah</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithdrawStep3