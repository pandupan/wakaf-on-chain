import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { forwardRef } from 'react'

const Step3 = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">3</span>
        <h1 className="text-lg font-bold">Informasi Pribadi</h1>
      </div>
      <Input
        placeholder="Nama Lengkap"
        className="focus-visible:border-secondary focus-visible:ring-0 focus-visible:ring-transparent"
      />
      <Input
        placeholder="Email atau Nomor Ponsel"
        className="focus-visible:border-secondary focus-visible:ring-0 focus-visible:ring-transparent"
      />
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="hidden-name" className="text-xs sm:text-sm">Sembunyikan nama (wakif anonim)</Label>
        <Switch id="hidden-name" />
      </div>
      <Separator />
      <div className="space-y-2">
        <Textarea
          placeholder="Tulis pesan atau doa (opsional)"
          className="focus-visible:border-secondary focus-visible:ring-0 focus-visible:ring-transparent"
        ></Textarea>
        <span className="inline-block text-xs leading-[14px]">Pesan ini akan terlihat oleh semua orang pada halaman detail kampanye yang dipilih<sup>*</sup></span>
      </div>
    </div>
  )
})

export default Step3