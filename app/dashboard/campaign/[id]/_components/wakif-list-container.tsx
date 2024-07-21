import React from 'react'
import WakifList from './wakif-list';
import { getWakifListTransaction } from '@/data/wakif';

interface IProps {
  campaignId: number;
}

async function WakifListContainer({ campaignId }: IProps) {
  const data = await getWakifListTransaction(campaignId);
  return (
    <WakifList
      campaignId={campaignId}
      data={data.wakif}
      totalWakif={data.count}
    />
  )
}

export default WakifListContainer