import { WITHDRAW_MINIMAL } from "@/app/dashboard/_constants/data";
import { db } from "@/lib/db"

export const getAllCampaigns = async (
  config?: {
    includeUser?: boolean;
    limit?: number;
    cursor?: number | undefined;
    search?: string;
    sorted?: 'createdAt' | 'updatedAt'
  }
) => {
  try {
    const campaigns = await db.campaign.findMany({
      where: !!config?.search?.length ? {
        OR: [
          {
            title: {
              contains: config.search,
              mode: 'insensitive',
            },
          },
          {
            category: {
              contains: config.search,
              mode: 'insensitive',
            },
          },
        ],
      } : undefined,
      orderBy: {
        [config?.sorted || 'createdAt']: 'desc'
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
        creator: config?.includeUser,
        creatorId: true,
        remaining: true,
        collected: true,
        createdAt: true,
        updatedAt: true,
        availableBalance: true
      },
      take: config?.limit || 9,
      skip: config?.cursor ? 1 : 0,
      cursor: config?.cursor ? { id: config.cursor } : undefined,
    });

    return campaigns;
  } catch (error) {
    return null;
  }
};

export const getCampaignById = async (
  id: number,
  config?: {
    withoutDescription?: boolean;
    includeUser?: boolean;
  }
) => {
  type PayloadType = {
    where: { id: number },
    select?: {
      [key: string]: boolean
    },
    include?: {
      creator: boolean;
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
      creator: true,
    }
  }

  try {
    const campaign = await db.campaign.findUnique(payload);

    return campaign;
  } catch {
    return null;
  }
};

export const getWithdrawListCampaigns = async () => {
  try {
    const campaigns = await db.campaign.findMany({
      where: {
        availableBalance: {
          gte: WITHDRAW_MINIMAL,
        }
      },
      select: {
        id: true,
        title: true,
        target: true,
        collected: true,
        remaining: true,
        availableBalance: true,
      },
    });

    return campaigns;
  } catch (error) {
    return null;
  }
};