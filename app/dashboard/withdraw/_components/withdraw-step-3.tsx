import React, { forwardRef } from 'react'
import { IoCheckmark } from 'react-icons/io5'
import { WithdrawalAccountItem } from '../_types';

interface IProps {
  withdrawalAccounts: WithdrawalAccountItem[];
  onSelectAccount: (id: string) => void;
}

const WithdrawStep3 = forwardRef<HTMLDivElement, IProps>(({
  withdrawalAccounts,
  onSelectAccount
}, ref) => {
  return (
    <div className="w-full space-y-4" ref={ref}>
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">3</span>
        <h1 className="text-lg font-bold">Pilih metode pencairan</h1>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {withdrawalAccounts.map((item) => (
          <div key={`wd-acc-${item.id}`} className="relative">
            <input
              type="radio"
              id={`wd-account-${item.id}`}
              name="account"
              value={`${item.id}`}
              className="hidden peer"
              onChange={(e) => onSelectAccount(e.target.value)}
            />
            <label
              htmlFor={`wd-account-${item.id}`}
              className="block p-3 border rounded-lg cursor-pointer peer-checked:border-secondary"
            >
              <h2 className="text-xs font-bold">{item.bankName}</h2>
              <span className="block text-secondary font-bold tracking-wide">
                {item.accountNumber}
              </span>
              <h6 className="text-xs text-gray-600">a.n {item.accountHolder}</h6>
            </label>
            <IoCheckmark className="
              hidden 
              peer-checked:inline-block 
              absolute 
              top-[50%] 
              -translate-y-[50%] 
              right-4 
              text-xl 
              text-secondary
            " />
          </div>
        ))}
      </div>
    </div>
  )
})

WithdrawStep3.displayName = "WithdrawStep3"

export default WithdrawStep3