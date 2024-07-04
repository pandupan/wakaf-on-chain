import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function WithdrawStep4() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">4</span>
        <h1 className="text-lg font-bold">Alasan pencairan</h1>
      </div>
      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          placeholder="Berikan informasi yang jelas kepada para wakif..."
          className="focus-visible:ring-0 focus-visible:ring-transparent"
        ></Textarea>
        <p className="text-xs mt-1">
          Jelaskan secara rinci mengapa anda menarik wakaf dari kampanye yang dipilih. Ini akan ditampilkan pada bagian alur pencairan dana di detail kampanye untuk transparansi data.
        </p>
      </div>
    </div>
  )
}

export default WithdrawStep4