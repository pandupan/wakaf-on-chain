import { Input } from '@/components/ui/input'
import { FormTypes } from '../_types'
import { addThousandSeparatorNumber, cn, formatRupiah } from '@/lib/utils';
import { forwardRef, useRef, useState } from 'react';

interface IProps {
  onChange: (amount: number) => void;
}

const radioAmounts = [
  {
    id: 'amount-1',
    value: 20000,
    emote: '🥰'
  },
  {
    id: 'amount-2',
    value: 50000,
    emote: '🤗'
  },
  {
    id: 'amount-3',
    value: 100000,
    emote: '😍'
  },
  {
    id: 'amount-4',
    value: 150000,
    emote: '🤩'
  },
  {
    id: 'amount-5',
    value: 250000,
    emote: '✨'
  },
  {
    id: 'amount-6',
    value: 500000,
    emote: '💖'
  },
];

const Step1 = forwardRef<HTMLDivElement, IProps>(({ onChange }, ref) => {
  const [inputType, setInputType] = useState<'radio' | 'input'>('radio');

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">1</span>
        <h1 className="text-lg font-bold">Pilih nominal</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {radioAmounts.map((item) => (
          <div key={item.id}>
            <input
              type="radio"
              id={item.id}
              name="amount"
              value={`${item.value}`}
              className="hidden peer"
              onChange={(e) => {
                onChange(+e.target.value);
              }}
            />
            <label
              htmlFor={item.id}
              onClick={() => {
                if (inputRef.current && inputType === 'input') {
                  setInputType('radio');
                  inputRef.current.value = '';
                  onChange(item.value);
                }
              }}
              className={cn(
                'block cursor-pointer hover:bg-muted rounded-lg border transition',
                inputType === 'radio' ? 'peer-checked:border-secondary peer-checked:bg-secondary/10' : ''
              )}
            >
              <div className="flex items-center gap-2 p-4 shadow-sm text-lg sm:text-xl font-extrabold">
                <span className="text-3xl sm:text-4xl">{item.emote}</span>
                {formatRupiah(item.value)}
              </div>
            </label>
          </div>
        ))}
      </div>
      <div className="border p-4 rounded-lg space-y-2">
        <h2>Nominal wakaf lainnya</h2>
        <label className="relative block bg-gray-100 rounded-md">
          <span className="absolute left-4 top-[50%] -translate-y-[50%] font-extrabold text-lg sm:text-xl">
            Rp
          </span>
          <Input
            ref={inputRef}
            className="pl-14 pr-4 py-3 h-auto text-right font-extrabold text-xl sm:text-2xl bg-transparent border-0 focus-visible:ring-transparent focus-visible:ring-0"
            placeholder="0"
            onChange={(e) => {
              if (inputType !== 'input') setInputType('input');
              const value = +e.target.value.replace(/[^0-9]/g, '');
              e.target.value = addThousandSeparatorNumber(value);
              onChange(value);
            }}
          />
        </label>
        <span className="block text-xs font-semibold text-gray-400">
          Minimal wakaf sebesar Rp20.000<sup>*</sup>
        </span>
      </div>
    </div>
  )
})

Step1.displayName = 'Step1'

export default Step1