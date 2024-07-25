import React from 'react'
import DataTable from './_components/data-table'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { getAllAdmins } from '@/data/admin'
import { getUserByEmail } from '@/data/user'
import { auth } from '@/auth'
import { isAdmin } from '@/lib/utils'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

const ManageAdminPage = async () => {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  const admins = await getAllAdmins();

  if (admins === null) redirect('/error');

  const superAdminsLength = admins.filter((adm) => adm.role === 'SUPER_ADMIN').length;
  const adminsLength = admins.filter((adm) => adm.role === 'ADMIN').length;

  return (
    <div className="w-full p-4 rounded-lg bg-background">
      <Alert variant="info" className="mb-4">
        <AiOutlineExclamationCircle fontSize={22} />
        <AlertTitle>Informasi perekrutan</AlertTitle>
        <AlertDescription>
          Perekrutan admin dan super admin memiliki batas maksimal.
          Jumlah maksimal admin yang diperbolehkan adalah <b>10 orang</b>,
          sementara jumlah maksimal super admin yang diperbolehkan adalah <b>2 orang</b>.
        </AlertDescription>
      </Alert>
      <DataTable
        data={admins}
        disabled={superAdminsLength >= 3 && adminsLength >= 10}
      />
    </div>
  )
}

export default ManageAdminPage
