import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    let whereQuery: any;

    switch (currentUser.role) {
      case 'SUPER_ADMIN':
        whereQuery = {
          OR: [
            { userId: currentUser.id },
            { userId: null, role: 'SUPER_ADMIN' },
            { userId: null, role: 'ADMIN' }
          ]
        }
        break;
      case 'ADMIN':
        whereQuery = {
          OR: [
            { userId: currentUser.id },
            { userId: null, role: 'ADMIN' }
          ]
        }
        break;
      case 'USER':
      default:
        whereQuery = { userId: currentUser.id }
        break;
    }

    const updatedNotifications = await db.notification.updateMany({
      where: {
        ...whereQuery,
        isRead: false
      },
      data: { isRead: true }
    })

    return NextResponse.json(updatedNotifications, {
      status: 200
    });

  } catch (error: any) {
    console.log('POST READ NOTIFICATION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}