import { db } from "@/lib/db"


export const getAllWithdrawalAccounts = async () => {
  try {
    const accounts = await db.withdrawalAccount.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    return accounts;
  } catch (error) {
    return null;
  }
}