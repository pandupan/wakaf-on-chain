import { db } from "@/lib/db";

export const getUserOverview = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      berwakafTotal: true,
      berwakafCount: true,
      largestWakaf: true
    },
  });

  const topUsers = await db.user.findMany({
    orderBy: { berwakafTotal: 'desc' },
    select: { id: true, berwakafTotal: true },
    take: 99,
  });

  // Cari pengguna dalam daftar 99 pengguna teratas
  const userRank = topUsers.findIndex(user => user.id === id);

  // Jika pengguna ditemukan dalam 99 teratas, berikan peringkatnya, jika tidak berikan "99+"
  const userRanking = userRank !== -1 ? userRank + 1 : '99+';

  return {
    wakaf: user?.berwakafTotal || 0,
    berwakaf: user?.berwakafCount || 0,
    ranking: `${userRanking}`,
    largestWakaf: user?.largestWakaf || 0
  }
}

export const getAdminOverview = async () => {
  const usersCount = await db.user.count();
  const berwakafCount = await db.user.aggregate({
    _sum: { berwakafCount: true },
  });
  const income = await db.transaction.aggregate({
    where: { status: 'COMPLETED' },
    _sum: { amount: true },
  });
  const activeCampaign = await db.campaign.count({
    where: { status: 'RUNNING' },
  });
  const disabledCampaign = await db.campaign.count({
    where: { status: 'CLOSED' },
  });
  const reachedCampaign = await db.campaign.count({
    where: { status: 'REACHED' },
  });

  return {
    usersCount,
    berwakafCount: berwakafCount._sum.berwakafCount,
    income: income._sum.amount,
    activeCampaign,
    disabledCampaign,
    reachedCampaign
  }
}