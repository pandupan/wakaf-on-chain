import { addWithdrawalAccount } from "@/actions/withdrawal-account"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { accountSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { VscLoading } from "react-icons/vsc"
import { toast } from "sonner"
import { z } from "zod"
import { WithdrawalAccountItem } from "./layout-account"

interface IProps {
  disabled?: boolean;
  onSuccess: (data: WithdrawalAccountItem) => void;
}

export function AddAccountDialog({ onSuccess, disabled }: IProps) {
  const [open, setOpen] = useState(false);
  const [adding, startAdding] = useTransition();

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountHolder: '',
      accountNumber: '',
      bankName: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof accountSchema>) => {
    startAdding(() => {
      addWithdrawalAccount(data).then((res) => {
        if (res.success) {
          toast.success('Akun penarikan berhasil ditambahkan.')
          onSuccess(res.data);
          form.reset();
          setOpen(false);
        } else {
          toast.error(res.error)
        }
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        <Button
          variant="secondary"
          size="sm"
          className="text-[10px] sm:text-xs rounded-lg"
          disabled={disabled}
        >
          Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Tambah Akun</DialogTitle>
          <DialogDescription>
            Anda hanya dapat menambahkan akun penarikan sebanyak 10 kali.
          </DialogDescription>
        </DialogHeader>
        {/* @ts-ignore */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2 py-4">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem className="grid sm:grid-cols-4 items-center sm:gap-4">
                    <FormLabel className="sm:text-right">Nama Bank/Wallet</FormLabel>
                    <div className="sm:col-span-3 space-y-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Misal: Dana, BRI, Gopay"
                          disabled={adding}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem className="grid sm:grid-cols-4 items-center sm:gap-4">
                    <FormLabel className="sm:text-right">No Rek/Telepon</FormLabel>
                    <div className="sm:col-span-3 space-y-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Masukan no rek/telepon"
                          disabled={adding}
                          onChange={(e) => {
                            const { value } = e.target;
                            if (!value.length || /^[0-9]+$/gi.test(value)) {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountHolder"
                render={({ field }) => (
                  <FormItem className="grid sm:grid-cols-4 items-center sm:gap-4">
                    <FormLabel className="sm:text-right">Atas Nama</FormLabel>
                    <div className="sm:col-span-3 space-y-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Masukan nama pemilik"
                          disabled={adding}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" variant="secondary" disabled={adding} className="gap-2">
                {adding && <VscLoading className="animate-spin" />}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
