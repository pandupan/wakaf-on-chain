'use client'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import ComboboxEmailInput from "./combobox-email-input"
import { useState } from "react"
import { UserRole } from "@prisma/client"
import { VscLoading } from "react-icons/vsc"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"

interface IProps {
  disabled: boolean;
  superAdminCount: number;
  adminCount: number;
}

function DialogAddAdmin({ disabled, adminCount, superAdminCount }: IProps) {
  const [loading, setLoading] = useState(false)
  const [inputData, setInputData] = useState<{
    id: string,
    role: UserRole | null
  }>({
    id: '',
    role: null,
  })

  const handleSubmit = () => {
    setLoading(true);

    axios.post(`/api/admin/${inputData.id}`, {
      role: inputData.role
    })
      .then(() => {
        toast.success('Admin berhasil ditambahkan!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          toast.error(error.response.data as string);
        } else {
          toast.error('Terjadi kesalahan! Coba lagi nanti.');
        }
        setLoading(false);
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="text-[10px] sm:text-xs rounded-lg"
          disabled={disabled}
        >
          Tambah Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Tambah admin</DialogTitle>
          <DialogDescription>
            Anda dapat menambahkan super admin dan admin jika belum melebihi batas maksimal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label className="sm:text-right">
              Email
            </Label>
            <ComboboxEmailInput
              className="sm:col-span-3"
              placeholder="Cari email pengguna"
              onValueChange={(id) => setInputData((prev) => ({ ...prev, id }))}
              disabled={loading}
            />
          </div>
          <div className="grid sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label className="sm:text-right">
              Role
            </Label>
            <Select
              disabled={loading}
              onValueChange={(role) => {
                setInputData((prev) => ({ ...prev, role: role as UserRole }));
              }}
            >
              <SelectTrigger className="sm:col-span-3">
                <SelectValue placeholder="Pilih role pengguna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="SUPER_ADMIN"
                  disabled={superAdminCount >= 3}
                >
                  Super Admin
                </SelectItem>
                <SelectItem
                  value="ADMIN"
                  disabled={adminCount >= 10}
                >
                  Admin
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="secondary"
            disabled={!inputData.id || !inputData.role || loading}
            onClick={handleSubmit}
            className="gap-2"
          >
            {loading && <VscLoading className="animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogAddAdmin