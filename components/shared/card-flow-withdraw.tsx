import { cn, formatIndonesianDate, formatRupiah } from '@/lib/utils';
import { Campaign, User, WithdrawalRequest } from '@prisma/client';
import React from 'react'
import { BsClock } from 'react-icons/bs';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

export type FlowWithdrawItem = (
  WithdrawalRequest & {
    user: Pick<User, 'id' | 'name'>;
    campaign: Pick<Campaign, 'id' | 'title' | 'availableBalance'>;
  }
)

interface IProps {
  data: FlowWithdrawItem;
  index: number;
  hiddenSortLabel?: boolean;
  showCampaignTitle?: boolean;
}

function CardFlowWithdraw({ data, index, hiddenSortLabel, showCampaignTitle }: IProps) {
  return (
    <li className="mb-4 ms-4 sm:ms-6">
      <span
        className={cn(
          'absolute flex items-center justify-center w-5 sm:w-6 h-5 sm:h-6 rounded-full text-white text-xs sm:text-sm -start-3 ring-4 sm:ring-8 ring-white',
          data.status === 'APPROVED' && 'bg-emerald-500',
          data.status === 'REJECTED' && 'bg-destructive',
          data.status === 'PENDING' && 'bg-sky-500',
        )}
      >
        {data.status === 'APPROVED' && <IoMdCheckmark />}
        {data.status === 'REJECTED' && <IoMdClose />}
        {data.status === 'PENDING' && <BsClock />}
      </span>
      <span className={cn(
        'text-xs sm:text-sm font-medium me-2 px-2.5 py-0.5 rounded',
        data.status === 'APPROVED' && 'text-emerald-500 bg-emerald-500/10',
        data.status === 'REJECTED' && 'text-destructive bg-destructive/10',
        data.status === 'PENDING' && 'text-sky-500 bg-sky-500/10',
      )}>
        {!hiddenSortLabel && `Pencairan ke-${index + 1}: `}
        <b>
          {formatRupiah(data.amount)}
          {data.status !== 'APPROVED' && ` (${data.status === 'PENDING' ? 'Pending' : 'Ditolak'})`}
        </b>
      </span>
      <h3 className="flex items-center gap-2 my-1 text-sm font-bold text-gray-800">
        {showCampaignTitle ? data.campaign.title : `${data.methodAccountHolder} - ${data.methodBankName}`}
      </h3>
      <time className="block mb-1 text-xs font-normal leading-none text-gray-400">
        {formatIndonesianDate(new Date(data.createdAt))}
      </time>
      <div className="mb-4 space-y-2 text-xs sm:text-sm font-normal text-gray-500">
        <p>{data.description}</p>
        {!!data.rejectedNote && (
          <div className="p-3 sm:p-4 border rounded-md">
            <h6 className="font-bold">Alasan:</h6>
            <p className="italic">{`"${data.rejectedNote}"`}</p>
          </div>
        )}
      </div>
    </li>
  )
}

export default CardFlowWithdraw