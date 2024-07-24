import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface IParams {
  notificationId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const { notificationId } = params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!notificationId) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const updatedNotification = await db.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    })

    return NextResponse.json(updatedNotification, {
      status: 200
    });

  } catch (error: any) {
    console.log('POST READ NOTIFICATION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}