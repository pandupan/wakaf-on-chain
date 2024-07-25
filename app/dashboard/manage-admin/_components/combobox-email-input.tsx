"use client"

import { ChevronsUpDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import InputSearch from "@/components/shared/input-search"
import { User } from "@prisma/client"
import { VscLoading } from "react-icons/vsc"
import axios from "axios"
import { toast } from "sonner"

interface IProps {
  className?: string;
  placeholder: string;
  disabled?: boolean;
  onValueChange?: (id: string) => void;
}

type UserItem = Pick<User, 'id' | 'name' | 'email'>;

function ComboboxEmailInput({ className, placeholder, disabled, onValueChange }: IProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string | null>(null)
  const [users, setUsers] = useState<UserItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [popoverWidth, setPopoverWidth] = useState<number | string>('auto')
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleSearch = (keyword: string) => {
    setLoading(true);

    axios.get('/api/admin/users', {
      params: { q: keyword }
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => toast.error('Terjadi kesalahan! Coba lagi nanti.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const updatePopoverWidth = () => {
      if (buttonRef.current) {
        setPopoverWidth(buttonRef.current.offsetWidth)
      }
    }

    // Set initial width
    updatePopoverWidth()

    // Update width on window resize
    window.addEventListener('resize', updatePopoverWidth)

    return () => {
      window.removeEventListener('resize', updatePopoverWidth)
    }
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between px-3', className)}
          disabled={disabled}
          ref={buttonRef}
        >
          {value
            ? users && users.find((user) => user.email === value)?.email
            : (
              <span className="text-foreground/80">
                {placeholder}
              </span>
            )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: popoverWidth }}>
        <InputSearch
          placeholder="Masukan email"
          className="py-3 rounded-lg shadow-none"
          onChange={handleSearch}
        />
        <Separator />
        {!loading && users !== null && (
          <div className="w-full p-0.5 text-sm space-y-0.5">
            {users.length > 0 && users.map((user) => (
              <button
                key={user.id}
                className="w-full block text-left hover:bg-muted rounded-md px-4 py-2 transition"
                onClick={() => {
                  setValue(user.email)
                  if (onValueChange) onValueChange(user.id);
                  setOpen(false)
                }}
              >
                {user.email}
              </button>
            ))}
            {users.length === 0 && (
              <p className="p-3 text-center text-foreground/80">
                Email tidak ditemukan
              </p>
            )}
          </div>
        )}
        {!loading && users === null && (
          <p className="p-3 text-center text-foreground/80 text-sm">
            Email akan muncul disini
          </p>
        )}
        {loading && (
          <div className="p-3 text-foreground/80">
            <VscLoading className="animate-spin mx-auto" />
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxEmailInput;
