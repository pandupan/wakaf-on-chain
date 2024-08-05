import { Campaign, User, WithdrawalAccount } from "@prisma/client";

export type CampaignItem = Pick<Campaign,
  'id' |
  'title' |
  'target' |
  'collected' |
  'remaining' |
  'availableBalance'
>;

export type WithdrawalAccountItem = WithdrawalAccount & {
  user: Pick<User, 'id' | 'name'>
}

export interface FormTypes {
  campaignId: null | number,
  amount: number,
  withdrawAccountId: null | string,
  description: string
}