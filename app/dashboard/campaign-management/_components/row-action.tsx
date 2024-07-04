import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { FiEdit, FiEye } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { FaEllipsis } from "react-icons/fa6"
import { LuX } from "react-icons/lu"

function RowAction() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="data-[state=open]:bg-muted text-xs">
          <FaEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] space-y-1">
        <DropdownMenuItem>
          <Link
            className="w-full flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            <FiEye /> Detail
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full flex items-center gap-2"
            rel="noopener noreferrer"
            href="#"
          >
            <FiEdit /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full"
        >
          <button className="w-full flex items-center gap-2 text-red-500 focus:text-red-500">
            <LuX /> Tutup Kampanye
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RowAction