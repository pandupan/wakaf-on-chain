import { db } from "@/lib/db";

export const getAllCampaigns = async () => {
  try {
    const campaigns = await db.campaign.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        image: true,
        title: true,
        status: true,
        numberOfWakif: true,
        target: true,
        category: true,
        phone: true,
        creatorId: true,
        remaining: true,
        collected: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const sortedCampaigns = campaigns.sort((a, b) => {
      const statusOrder = {
        RUNNING: 1,
        CLOSED: 2,
        REACHED: 3,
      };

      if (statusOrder[a.status] < statusOrder[b.status]) return -1;
      if (statusOrder[a.status] > statusOrder[b.status]) return 1;
      return 0;
    });

    return sortedCampaigns;
  } catch {
    return null;
  }
};

export const getCampaignById = async (
  id: number,
  config?: {
    withoutDescription?: boolean;
    includeUser?: boolean;
    onlyIncludeNameIdUser?: boolean;
  }
) => {
  type PayloadType = {
    where: { id: number },
    select?: {
      [key: string]: boolean
    },
    include?: {
      creator: boolean | {
        select: {
          name: boolean,
          id: boolean
        }
      };
    }
  }

  let payload: PayloadType = {
    where: { id }
  }

  if (config && config.withoutDescription) {
    payload.select = {
      id: true,
      image: true,
      title: true,
      status: true,
      numberOfWakif: true,
      target: true,
      category: true,
      phone: true,
      creatorId: true,
      remaining: true,
      collected: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  if (config && config.includeUser) {
    payload.include = {
      creator: config.onlyIncludeNameIdUser ? {
        select: {
          id: true,
          name: true
        }
      } : true,
    }
  }

  try {
    const campaign = await db.campaign.findUnique(payload);

    return campaign;
  } catch {
    return null;
  }
};