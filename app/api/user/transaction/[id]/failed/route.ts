import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { CampaignStatus } from "@prisma/client";
import { NextResponse } from "next/server"

interface IParams {
  id?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const { id } = params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!id) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const transaction = await db.transaction.findUnique({ where: { id } });

    if (!transaction || (transaction.userId !== currentUser.id) || (transaction.status !== 'PENDING')) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const updatedTransaction = await db.transaction.update({
      where: { id },
      data: {
        status: 'FAILED'
      }
    });

    return NextResponse.json(updatedTransaction, {
      status: 201
    });

  } catch (error: any) {
    console.log('POST FAILED STATUS TRANSACTION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}