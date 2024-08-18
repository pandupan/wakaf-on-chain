import { db } from "@/lib/db";
import { calculatePercentageChange } from "@/lib/utils";

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

async function getCurrentMonthIncome() {
  const currentDate = new Date();
  const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const firstDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  // Pemasukan bulan ini
  const currentMonthIncome = await db.transaction.aggregate({
    where: {
      status: 'COMPLETED',
      createdAt: {
        gte: firstDayOfCurrentMonth,
        lte: currentDate,
      },
    },
    _sum: {
      amount: true,
    },
  });

  // Pemasukan bulan sebelumnya
  const previousMonthIncome = await db.transaction.aggregate({
    where: {
      status: 'COMPLETED',
      createdAt: {
        gte: firstDayOfPreviousMonth,
        lte: lastDayOfPreviousMonth,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return {
    current: currentMonthIncome._sum.amount || 0,
    previous: previousMonthIncome._sum.amount || 0,
  };
}

export const getAdminOverview = async () => {
  const usersCount = await db.user.count({
    where: { role: 'USER' }
  });
  const monthlyIncome = await getCurrentMonthIncome();
  const berwakafCount = await db.transaction.count({
    where: { status: 'COMPLETED' },
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
  const availableBalance = await db.campaign.aggregate({
    where: {
      availableBalance: {
        gt: 0
      }
    },
    _sum: {
      availableBalance: true
    }
  });

  return {
    usersCount,
    monthlyIncome: {
      amount: monthlyIncome.current,
      percentageChange: calculatePercentageChange(monthlyIncome.current, monthlyIncome.previous),
    },
    berwakafCount,
    activeCampaign,
    disabledCampaign,
    reachedCampaign,
    availableBalance: availableBalance._sum.availableBalance || 0
  }
}

export async function getWakafIncomeLastYear() {
  const data = await db.transaction.groupBy({
    by: ['createdAt'],
    _sum: {
      amount: true,
    },
    where: {
      createdAt: {
        gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Gabungkan data dengan bulan yang sama
  const combinedData = data.reduce((acc, item) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(item.createdAt);

    if (!acc[formattedDate]) {
      acc[formattedDate] = item._sum.amount || 0;
    } else {
      acc[formattedDate] += item._sum.amount || 0;
    }

    return acc;
  }, {} as Record<string, number>);

  // Pisahkan series dan categories
  const series = Object.values(combinedData);
  const categories = Object.keys(combinedData);

  return { series, categories };
}