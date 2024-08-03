"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { accountSchema } from "@/schemas";
import { z } from "zod";

export const addWithdrawalAccount = async (data: z.infer<typeof accountSchema>) => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return { error: 'Unauthorized' };
    }

    const validatedFields = accountSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: 'Invalid inputs' }
    }

    const accountCount = await db.withdrawalAccount.count()

    if (accountCount >= 10) {
      return { error: 'Batas pembuatan akun telah mencapai maksimal!' }
    }

    const newAccount = await db.withdrawalAccount.create({
      data: {
        userId: session.user.id,
        ...validatedFields.data
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return {
      success: 'Add withdrawal account successfully',
      data: newAccount
    }
  } catch (error) {
    console.log('ADD WD ACCOUNT ERROR: ', error);
    return { error: 'Internal error' }
  }
}

export const deleteWithdrawalAccount = async (accountId: string) => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return { error: 'Unauthorized' };
    }

    await db.withdrawalAccount.delete({
      where: { id: accountId }
    })

    return { success: 'Withdrawal account deleted' }
  } catch (error) {
    console.log('ADD WD ACCOUNT ERROR: ', error);
    return { error: 'Internal error' }
  }
}