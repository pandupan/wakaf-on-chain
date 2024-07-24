'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@/components/core/table";
import { User } from "@prisma/client";
import React, { useState } from "react";
import DataTableRow from "./data-table-row";
import DialogAddAdmin from "./dialog-add-admin";
import RemoveAdminAlert from "./remove-admin-alert";

export type AdminListType = Pick<User,
  'id' |
  'name' |
  'image' |
  'role' |
  'email' |
  'adminRecruitedAt'
>

interface IProps {
  data: AdminListType[];
  disabled: boolean;
}

const DataTable: React.FC<IProps> = ({ data, disabled }) => {
  const [removeAdminDisplay, setRemoveAdminDisplay] = useState(false);
  const [removeAdminId, setRemoveAdminId] = useState<string | null>(null);

  return (
    <>
      <RemoveAdminAlert
        adminId={removeAdminId}
        open={removeAdminDisplay}
        onOpenChange={setRemoveAdminDisplay}
        onCancel={() => {
          setRemoveAdminId(null);
        }}
      />
      <div className="w-full flex justify-between items-end mb-2">
        <h2 className="font-semibold leading-0">Daftar Admin</h2>
        <DialogAddAdmin
          disabled={disabled}
          superAdminCount={data.filter((adm) => adm.role === 'SUPER_ADMIN').length}
          adminCount={data.filter((adm) => adm.role === 'ADMIN').length}
        />
      </div>
      <Table>
        <TableHead>
          <TableHeadCol className="rounded-l-lg">Profile</TableHeadCol>
          <TableHeadCol>Email</TableHeadCol>
          <TableHeadCol>Tanggal Rekrut</TableHeadCol>
          <TableHeadCol>Total Penar.</TableHeadCol>
          <TableHeadCol>Riwayat Penarikan</TableHeadCol>
          <TableHeadCol className="text-center rounded-r-lg">Aksi</TableHeadCol>
        </TableHead>
        <TableBody>
          {data.map((admin) => (
            <TableRow key={admin.id}>
              <DataTableRow
                data={admin}
                onClickDelete={(adminId) => {
                  setRemoveAdminDisplay(true);
                  setRemoveAdminId(adminId)
                }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
