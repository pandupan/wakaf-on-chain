'use client'

import { User, WithdrawalAccount } from '@prisma/client'
import { AddAccountDialog } from './add-account-dialog'
import DataTable from './data-table'
import { useState } from 'react';
import { DeleteAccountAlert } from './delete-account-alert';

export type WithdrawalAccountItem = WithdrawalAccount & {
  user: Pick<User, 'id' | 'name'>;
};

interface IProps {
  data: WithdrawalAccountItem[];
}

function LayoutAccount({ data }: IProps) {
  const [accounts, setAccounts] = useState(data);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState<string | null>(null)

  return (
    <div className="bg-background p-4 rounded-xl shadow-sm space-y-2">
      <div className="mb-2 w-full flex justify-between items-end">
        <h2 className="sm:text-lg font-semibold">Akun Penarikan</h2>
        <AddAccountDialog
          disabled={accounts.length >= 10}
          onSuccess={(account) => {
            setAccounts((prev) => [...prev, account])
          }}
        />
      </div>
      <DeleteAccountAlert
        accountId={deleteAccountId}
        open={deleteDisplay}
        onOpenChange={setDeleteDisplay}
        onCancel={() => {
          setDeleteAccountId(null);
        }}
        onDeleteSuccess={(id) => {
          setDeleteAccountId(null);
          setAccounts((prev) => prev.filter((item) => item.id !== id));
        }}
      />
      <DataTable
        data={accounts}
        onClickDelete={(id) => {
          setDeleteAccountId(id);
          setDeleteDisplay(true);
        }}
      />
    </div>
  )
}

export default LayoutAccount