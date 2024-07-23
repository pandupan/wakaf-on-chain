import { Campaign } from "@prisma/client";

export type CampaignListItem = Omit<Campaign,
  'description' |
  'imageDetail1' |
  'imageDetail2' |
  'imageDetail3' |
  'imageDetail4' |
  'imageDetail5'
>;