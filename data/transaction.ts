import { db } from "@/lib/db";

export const getTransactionById = async (id: string) => {
  try {
    const transaction = await db.transaction.findUnique({
      where: { id },
      include: {
        campaign: true,
        user: true
      }
    });

    return transaction;
  } catch {
    return null;
  }
};

export const getAllTransactions = async (
  config?: {
    limit?: number;
    cursor?: string | undefined;
    search?: string;
    sorted?: 'createdAt' | 'updatedAt';
    userId?: string;
  }
) => {
  const searchQuery = !!config?.search?.length ? [
    {
      campaign: {
        title: {
          contains: config.search,
          mode: 'insensitive',
        }
      },
    },
    {
      user: {
        name: {
          contains: config.search,
          mode: 'insensitive',
        }
      },
    },
  ] : null;

  const filterQuery = !!config?.userId ? {
    userId: config.userId,
  } : null;

  try {
    const transactions = await db.transaction.findMany({
      // @ts-expect-error
      where: !!searchQuery && !!filterQuery ?
        {
          AND: [
            { ...filterQuery },
            { OR: searchQuery }
          ]
        } : !!searchQuery ?
          { OR: searchQuery } : !!filterQuery ?
            { ...filterQuery } : undefined,
      orderBy: {
        [config?.sorted || 'createdAt']: 'desc'
      },
      take: config?.limit || 9,
      skip: config?.cursor ? 1 : 0,
      cursor: config?.cursor ? { id: config.cursor } : undefined,
      include: {
        user: true,
        campaign: true
      }
    });

    return transactions;
  } catch (error) {
    return null;
  }
};