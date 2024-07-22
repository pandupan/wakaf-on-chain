import React from 'react'
import WakifList from './wakif-list';
import { getWakifListTransaction } from '@/data/wakif';

interface IProps {
  campaignId: number;
}

const LIMIT = 20;

async function WakifListContainer({ campaignId }: IProps) {
  const data = await getWakifListTransaction(campaignId, {
    limit: LIMIT,
  });

  return (
    <WakifList
      campaignId={campaignId}
      data={data.wakif}
      totalWakif={data.count}
      limit={LIMIT}
    />
  )
}

export default WakifListContainer