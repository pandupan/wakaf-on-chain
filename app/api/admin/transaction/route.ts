import { auth } from "@/auth";
import { getAllTransactions } from "@/data/transaction";
import { getUserById } from "@/data/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const cursor = searchParams.get('cursor');
  const limit = searchParams.get('limit');
  const search = searchParams.get('search') || '';

  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || currentUser.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const parsedCursor = cursor || '';
    const parsedLimit = limit && !isNaN(+limit) ? parseInt(limit, 10) : 9;

    const campaigns = await getAllTransactions({
      cursor: parsedCursor,
      limit: parsedLimit,
      search,
    });

    if (campaigns === null) throw new Error('Error when get transactions');

    return NextResponse.json(campaigns, {
      status: 200
    })
  } catch (error: any) {
    console.log('GET ADMIN TRANSACTIONS ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}