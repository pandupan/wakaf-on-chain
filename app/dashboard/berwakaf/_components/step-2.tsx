import { forwardRef } from 'react'
import { FaCheck } from 'react-icons/fa6'

interface IProps {
  onChange: (payment: { value: string, label: string }) => void;
}

const paymentMethods = [
  {
    category: "E-Wallet dan QRIS",
    methods: [
      { id: 'wallet-1', value: 'QRIS', label: 'QRIS' },
      { id: 'wallet-2', value: 'LinkAja', label: 'LinkAja' },
      { id: 'wallet-3', value: 'ShoopePay', label: 'ShoopePay' },
      { id: 'wallet-4', value: 'Dana', label: 'Dana' }
    ]
  },
  {
    category: "Virtual Account",
    methods: [
      { id: 'va-1', value: 'BRIVA', label: 'BRIVA' },
      { id: 'va-2', value: 'BCA VA', label: 'BCA VA' }
    ]
  }
];

const Step2 = forwardRef<HTMLDivElement, IProps>(({ onChange }, ref) => {
  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">2</span>
        <h1 className="text-lg font-bold">Pilih metode wakaf</h1>
      </div>
      {paymentMethods.map((category, index) => (
        <div key={index} className="space-y-1">
          <h4 className="font-bold text-sm">{category.category}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {category.methods.map((method) => (
              <div key={method.id} className="relative">
                <input
                  type="radio"
                  id={method.id}
                  name="amount"
                  value={`${method.value}`}
                  className="hidden peer"
                  onChange={() => {
                    onChange({
                      value: method.value,
                      label: method.label
                    })
                  }}
                />
                <label
                  htmlFor={method.id}
                  className="block cursor-pointer rounded-lg border peer-checked:border-secondary"
                >
                  <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
                    <div className="w-[80px] aspect-[4/3] text-lg rounded-md bg-muted"></div>
                    {method.label}
                  </div>
                </label>
                <FaCheck
                  className="
                    hidden
                    peer-checked:block
                    absolute 
                    top-[50%] 
                    -translate-y-[50%] 
                    right-4 
                    text-xl 
                    text-secondary
                  "
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

export default Step2