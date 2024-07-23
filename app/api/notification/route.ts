import { auth } from "@/auth";
import { getAllNotifications } from "@/data/notification";
import { getUserById } from "@/data/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const cursor = searchParams.get('cursor');
  const limit = searchParams.get('limit');

  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const parsedCursor = cursor || '';
    const parsedLimit = limit && !isNaN(+limit) ? parseInt(limit, 10) : 9;

    const notifications = await getAllNotifications(currentUser.id, {
      cursor: parsedCursor,
      limit: parsedLimit,
    });

    if (notifications === null) throw new Error('Error when get notifications');

    return NextResponse.json(notifications, {
      status: 200
    })
  } catch (error: any) {
    console.log('GET USER NOTIFICATION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}