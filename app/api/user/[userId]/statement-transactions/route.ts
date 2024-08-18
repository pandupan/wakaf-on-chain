import { getAllStatementTransactions } from "@/data/transaction";
import { getAllWithdrawalRequestsByCampaignId } from "@/data/withdrawal-request";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const { userId } = params;
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const cursor = searchParams.get('cursor') || undefined;
  const limit = searchParams.get('limit');

  if (!userId) {
    return new NextResponse('Invalid input', { status: 400 });
  }

  try {
    const parsedLimit = limit && !isNaN(+limit) ? parseInt(limit, 10) : 9;

    const statementTransactions = await getAllStatementTransactions(userId, {
      cursor: cursor,
      limit: parsedLimit,
    });

    console.log(statementTransactions)

    return NextResponse.json(statementTransactions, {
      status: 200
    })
  } catch (error: any) {
    console.log('GET STATEMENT TRANSACTIONS ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}