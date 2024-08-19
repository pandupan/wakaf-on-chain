import { auth } from "@/auth";
import Certifications from "./_components/statements"
import Profile from "./_components/profile"
import { getUserByEmail } from "@/data/user";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { getAllStatementTransactions } from "@/data/transaction";

const LIMIT = 10;

export default async function ProfilePage() {
  const session = await auth();

  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user) redirect('/404');
  }

  const statementTransactions = await getAllStatementTransactions(user!.id, {
    limit: LIMIT
  });

  if (!statementTransactions) return redirect('/error');

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-5">
        <Profile data={user!} />
      </div>
      <div className="col-span-12 md:col-span-7">
        <Certifications
          data={statementTransactions}
          limit={LIMIT}
          userId={user!.id}
        />
      </div>
    </div>
  )
}
