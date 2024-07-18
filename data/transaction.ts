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
    sorted?: 'createdAt' | 'updatedAt'
  }
) => {
  try {
    const transactions = await db.transaction.findMany({
      where: !!config?.search?.length ? {
        OR: [
          {
            campaign: {
              title: {
                contains: config.search,
                mode: 'insensitive',
              }
            },
          },
          {
            campaign: {
              category: {
                contains: config.search,
                mode: 'insensitive',
              }
            },
          },
        ],
      } : undefined,
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