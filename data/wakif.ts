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