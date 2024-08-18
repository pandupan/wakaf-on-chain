import React from 'react'
import { getAllWithdrawalRequestsByCampaignId } from '@/data/withdrawal-request';
import { redirect } from 'next/navigation';
import FlowWithdraw from './flow-withdraw';
import { formatRupiah } from '@/lib/utils';

interface IProps {
  campaignId: number;
}

const LIMIT = 5;

async function WakafFlowWithdraw({ campaignId }: IProps) {
  const response = await getAllWithdrawalRequestsByCampaignId(campaignId, {
    limit: LIMIT
  });

  if (!response) redirect('/error');

  const { approvedAmount, availableBalance, data } = response;

  return (
    <>
      <div className="space-y-2">
        <div className="p-4 flex justify-between gap-4 border rounded-md">
          <h3 className="text-sm lg:text-base">
            Tersedia:{' '}
            <br className="sm:hidden" />
            <b className="text-secondary">{formatRupiah(availableBalance)}</b>
          </h3>
          <h3 className="text-sm lg:text-base">
            Tersalurkan:{' '}
            <br className="sm:hidden" />
            <b className="text-emerald-500">{formatRupiah(approvedAmount)}</b>
          </h3>
        </div>
        {data.length === 0 ? (
          <div className="px-2">
            <p className="text-sm lg:text-base">Belum ada data pencairan dana.</p>
          </div>
        ) : (
          <FlowWithdraw data={data} limit={LIMIT} campaignId={campaignId} />
        )}
      </div>
    </>
  )
}

export default WakafFlowWithdraw