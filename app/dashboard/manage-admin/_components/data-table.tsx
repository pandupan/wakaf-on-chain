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
import { FiClock, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

const DataTable = () => {
  return (
    <div className="p-4 rounded-lg bg-background mt-4">
      <div className="mb-2 w-full flex justify-between items-end">
        <h2 className="sm:text-lg font-semibold">Daftar Admin</h2>
        <Link href="#">
            <Button variant="secondary" size="sm" className="text-[10px] sm:text-xs rounded-lg">
              Tambah Admin
            </Button>
          </Link>
      </div>
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Foto Profile</TableHeadCol>
          <TableHeadCol>Nama</TableHeadCol>
          <TableHeadCol>Email</TableHeadCol>
          <TableHeadCol className="text-center">Jabatan</TableHeadCol>
          <TableHeadCol>Tanggal Rekrut</TableHeadCol>
          <TableHeadCol>Total Permintaan Penarikan</TableHeadCol>
          <TableHeadCol>Total Penarikan(Rp)</TableHeadCol>
          <TableHeadCol className="text-center rounded-r-lg">Aksi</TableHeadCol>
        </TableHead>
        <TableBody>
          <TableRow>
          <TableCell className="rounded-l-lg items-center">
            <div className="bg-gray-300 rounded-full w-14 h-14">

            </div>
          </TableCell>
            <TableCell>Ega Aprianto</TableCell>
            <TableCell>227006018@student.unsil.ac.id</TableCell>
            <TableCell>
              <Badge variant="success" className="text-[10px] sm:text-xs">
                Bendahara
              </Badge>
            </TableCell>
            <TableCell>22 Juni 2024</TableCell>
            <TableCell className="text-center">9x</TableCell>
            <TableCell>Rp. 9.000.000</TableCell>
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
                      className="w-full flex items-center gap-2 text-red-500"
                      href="#"
                    >
                      <FiTrash2 /> Hapus Admin
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
