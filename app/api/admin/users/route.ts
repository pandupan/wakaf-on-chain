import { auth } from "@/auth"
import { get5UsersByEmailKeyword, getUserById } from "@/data/user"
import { isAdmin } from "@/lib/utils";
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const keyword = searchParams.get('q') || '';

  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const users = await get5UsersByEmailKeyword(keyword);

    if (users === null) throw new Error('Error when get transactions');

    return NextResponse.json(users, {
      status: 200
    })
  } catch (error: any) {
    console.log('GET USERS MANAGE ADMIN ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}