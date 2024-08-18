import { getAllWithdrawalRequestsByCampaignId } from "@/data/withdrawal-request";
import { NextResponse } from "next/server";

interface IParams {
  campaignId?: number;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const { campaignId } = params;
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const cursor = searchParams.get('cursor') || undefined;
  const limit = searchParams.get('limit');

  if (!campaignId || isNaN(+campaignId)) {
    return new NextResponse('Invalid input', { status: 400 });
  }

  try {
    const parsedLimit = limit && !isNaN(+limit) ? parseInt(limit, 10) : 9;

    const withdrawRequests = await getAllWithdrawalRequestsByCampaignId(+campaignId, {
      cursor: cursor,
      limit: parsedLimit,
    });

    if (!withdrawRequests) throw new Error('Error in getAllWithdrawalRequestsByCampaignId function.')

    return NextResponse.json(withdrawRequests.data, {
      status: 200
    })
  } catch (error: any) {
    console.log('GET CAMPAIGN WITHDRAW REQUESTS ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}