import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaEllipsis } from 'react-icons/fa6'
import { PiCertificate } from 'react-icons/pi'
import { BiMessageDetail } from 'react-icons/bi'

interface IProps {
  onClickMessage: () => void;
  disabled: boolean;
}

function RowAction({ onClickMessage, disabled }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button size="sm" variant="outline" className="data-[state=open]:bg-muted text-xs">
          <FaEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] space-y-1">
        <DropdownMenuItem>
          <Link
            className="w-full flex items-center gap-2 text-secondary"
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            <PiCertificate /> Verifikasi Serah Terima
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full"
        >
          <button onClick={onClickMessage} className="w-full flex items-center gap-2">
            <BiMessageDetail /> Pesan/Doa Wakif
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RowAction