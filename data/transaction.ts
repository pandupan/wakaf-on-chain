import { db } from "@/lib/db";
import { TransactionStatus } from "@prisma/client";

interface FilterQuery {
  userId?: string;
  status?: string;
}

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
    category?: TransactionStatus;
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

  const filterQuery: FilterQuery = {};

  if (!!config?.userId) {
    filterQuery.userId = config.userId;
  }

  if (!!config?.category) {
    filterQuery.status = config.category;
  }

  const filterIsEmpty = Object.keys(filterQuery).length === 0;

  try {
    const transactions = await db.transaction.findMany({
      // @ts-expect-error
      where: !!searchQuery && !filterIsEmpty ?
        {
          AND: [
            { ...filterQuery },
            { OR: searchQuery }
          ]
        } : !!searchQuery ?
          { OR: searchQuery } : !filterIsEmpty ?
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