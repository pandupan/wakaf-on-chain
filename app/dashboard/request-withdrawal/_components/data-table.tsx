import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@/components/core/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import { FaEllipsis } from "react-icons/fa6";
import { FiEye, FiCheck, FiX } from "react-icons/fi";

const DataTable = () => {
  return (
    <div className="p-4 rounded-lg bg-background mt-4">
      <div className="mb-2 w-full flex justify-between items-end">
        <h2 className="sm:text-lg font-semibold">
          Daftar Permintaan Penarikan Dana
        </h2>
      </div>
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Jumlah</TableHeadCol>
          <TableHeadCol>Status</TableHeadCol>
          <TableHeadCol>Kampanye</TableHeadCol>
          <TableHeadCol className="text-left">Admin</TableHeadCol>
          <TableHeadCol>Tanggal</TableHeadCol>
          <TableHeadCol>Metode</TableHeadCol>
          <TableHeadCol className="text-center rounded-r-lg">Aksi</TableHeadCol>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="rounded-l-lg">Rp2.500.000</TableCell>
            <TableCell>
              <Badge variant="success" className="text-[10px] sm:text-xs">
                Sukses
              </Badge>
            </TableCell>
            <TableCell>
              Kebutuhan untuk perbaikan mesjid al ihsan tasikmalaya 2024
            </TableCell>
            <TableCell>Aam H</TableCell>
            <TableCell>20:33, 7 Juli 2024</TableCell>
            <TableCell>DANA</TableCell>
            <TableCell className="rounded-r-lg">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="data-[state=open]:bg-muted text-xs"
                  >
                    <FaEllipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[200px] space-y-1"
                >
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
                      className="w-full flex items-center gap-2 text-emerald-500 focus:text-emerald-500"
                      href="#"
                    >
                      <FiCheck /> Terima & Upload Bukti
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      className="w-full flex items-center gap-2 text-red-500"
                      href="#"
                    >
                      <FiX /> Tolak Permintaan
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
