import { getAllWithdrawalAccounts } from '@/data/withdrawal-account'
import LayoutAccount from './_components/layout-account'
import { auth } from '@/auth';
import { User } from '@prisma/client';
import { getUserByEmail } from '@/data/user';
import { isAdmin } from '@/lib/utils';
import { redirect } from 'next/navigation';

async function WithdrawalAccountPage() {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  const accounts = await getAllWithdrawalAccounts();

  if (accounts === null) redirect('/error');

  return (
    <LayoutAccount data={accounts} />
  )
}

export default WithdrawalAccountPage