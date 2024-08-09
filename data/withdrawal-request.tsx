import { db } from "@/lib/db";
import { WithdrawalStatus } from "@prisma/client";

export const getWithdrawalRequestById = async (id: string) => {
  try {
    const aggregateData = await db.withdrawalRequest.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'PENDING',
        id,
      },
    });

    const data = await db.withdrawalRequest.findUnique({
      where: { id },
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
            category: true,
            collected: true,
            availableBalance: true,
            image: true,
            phone: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (data?.campaign) {
      data.campaign.availableBalance += aggregateData._sum.amount || 0;
    }

    return data;
  } catch (error) {
    return null;
  }
}

interface FilterQuery {
  userId?: string;
  status?: string;
}

export const getAllWithdrawalRequests = async (
  config?: {
    limit?: number;
    cursor?: string | undefined;
    search?: string;
    sorted?: 'createdAt' | 'updatedAt';
    userId?: string;
    category?: WithdrawalStatus;
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
    const withdrawalRequests = await db.withdrawalRequest.findMany({
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
        user: {
          select: {
            id: true,
            name: true
          }
        },
        campaign: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    return withdrawalRequests;
  } catch (error) {
    return null;
  }
};