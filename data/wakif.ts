import { auth } from "@/auth";
import { db } from "@/lib/db"

export const getWakifListTransaction = async (campaignId: number) => {
  const wakifCount = await db.transaction.count({
    where: {
      campaignId: campaignId,
      status: 'COMPLETED'
    }
  })

  const wakifList = await db.campaign.findUnique({
    where: { id: campaignId },
    select: {
      transaction: {
        where: {
          status: 'COMPLETED'
        },
        take: 10,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          updatedAt: true,
          amount: true,
          name: true,
          isHiddenName: true,
          user: {
            select: {
              id: true,
              image: true,
              name: true
            }
          }
        }
      }
    },
  });

  return {
    count: wakifCount,
    wakif: !wakifList ? [] : wakifList.transaction
  }
}

export const getTopWakif = async (take = 10, config?: {
  getYourRank: boolean,
  userId: string
}) => {
  const topWakif = await db.user.findMany({
    where: { role: 'USER' },
    orderBy: { berwakafTotal: 'desc' },
    select: {
      id: true,
      name: true,
      berwakafTotal: true,
      largestWakaf: true,
      berwakafCount: true
    },
    take: take,
  });

  if (config && config.getYourRank) {
    const topUsers = await db.user.findMany({
      orderBy: { berwakafTotal: 'desc' },
      select: { id: true },
      take: 99,
    });

    // Cari pengguna dalam daftar 99 pengguna teratas
    const userRank = topUsers.findIndex(user => user.id === config.userId);

    // Jika pengguna ditemukan dalam 99 teratas, berikan peringkatnya, jika tidak berikan "99+"
    const userRanking = userRank !== -1 ? userRank + 1 : '99+';

    return {
      yourRank: `${userRanking}`,
      rank: topWakif
    }
  }

  return {
    yourRank: null,
    rank: topWakif
  };
}