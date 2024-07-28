import { db } from "@/lib/db";

export const getCampaignCommentsByCampaignId = async (campaignId: number, config?: {
  limit?: number;
  cursor?: number | undefined;
}) => {
  const comments = await db.campaignComment.findMany({
    where: { campaignId },
    take: config?.limit || 10,
    skip: config?.cursor ? 1 : 0,
    cursor: config?.cursor ? { id: config.cursor } : undefined,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: {
        select: {
          id: true,
          image: true,
          name: true
        }
      }
    }
  });

  return comments;
}