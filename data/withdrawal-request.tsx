import { db } from "@/lib/db";

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