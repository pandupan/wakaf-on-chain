import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { forwardRef } from 'react'
import { FormTypes } from '../_types'

type KeyType = 'name' | 'email' | 'message' | 'isHiddenName';

interface IProps {
  onChange: (key: KeyType, value: string | boolean) => void;
  data: FormTypes['step3'];
}

const Step3 = forwardRef<HTMLDivElement, IProps>(({ onChange, data }, ref) => {
  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">3</span>
        <h1 className="text-lg font-bold">Informasi Pribadi</h1>
      </div>
      <Input
        placeholder="Nama Lengkap"
        className="focus-visible:border-secondary focus-visible:ring-0 focus-visible:ring-transparent"
        defaultValue={data.name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />
      <Input
        placeholder="Email atau Nomor Ponsel"
        className="focus-visible:border-secondary focus-visible:ring-0 focus-visible:ring-transparent"
        defaultValue={data.email}
        onChange={(e) => {
          onChange('email', e.target.value);
        }}
      />
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="hidden-name" className="text-xs sm:text-sm">Sembunyikan nama (wakif anonim)</Label>
        <Switch
          id="hidden-name"
          defaultChecked={data.isHiddenName}
          onCheckedChange={(checked) => {
            onChange('isHiddenName', checked);
          }}
        />
      </div>
      <Separator />
      <div className="space-y-2">
        <Textarea
          placeholder="Tulis pesan atau doa (opsional)"
          className="focus-visible:border-secondary focus-visible:ring-0 focus-visible:ring-transparent"
          onChange={(e) => {
            onChange('message', e.target.value);
          }}
        ></Textarea>
        <span className="inline-block text-xs leading-[14px]">
          Pesan ini akan terlihat oleh semua orang pada halaman detail kampanye yang dipilih<sup>*</sup>
        </span>
      </div>
    </div>
  )
})

export default Step3