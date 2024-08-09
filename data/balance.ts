import { WITHDRAW_MINIMAL } from "@/app/dashboard/_constants/data";
import { db } from "@/lib/db";

export const getWithdrawOverview = async () => {
  try {
    const campaignAggregate = await db.campaign.aggregate({
      where: {
        availableBalance: {
          gt: 0
        }
      },
      _sum: {
        availableBalance: true
      }
    });

    const campaignsEligible = await db.campaign.count({
      where: {
        availableBalance: {
          gte: WITHDRAW_MINIMAL
        }
      }
    });

    return {
      totalAvailableBalance: campaignAggregate._sum.availableBalance || 0,
      campaignsEligible,
    };
  } catch (error) {
    return null;
  }
}