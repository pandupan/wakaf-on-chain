import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { forwardRef } from 'react'

interface IProps {
  onDescriptionChange: (value: string) => void;
}

const WithdrawStep4 = forwardRef<HTMLDivElement, IProps>(({
  onDescriptionChange
}, ref) => {
  return (
    <div className="w-full space-y-4" ref={ref}>
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">4</span>
        <h1 className="text-lg font-bold">Alasan pencairan</h1>
      </div>
      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          placeholder="Tulis deskripsi (min. 50 karakter)"
          className="focus-visible:ring-0 focus-visible:ring-transparent no-scrollbar resize-none h-[100px]"
          onChange={(e) => onDescriptionChange(e.target.value)}
        ></Textarea>
        <p className="text-xs mt-1">
          Jelaskan secara rinci mengapa anda menarik wakaf dari kampanye yang dipilih.
          Ini akan ditampilkan pada bagian alur pencairan
          dana di detail kampanye untuk transparansi data.
        </p>
      </div>
    </div>
  )
})

WithdrawStep4.displayName = "WithdrawStep4"

export default WithdrawStep4