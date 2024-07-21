import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
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

    const campaign = await db.campaign.findUnique({
      where: { id: transaction.campaignId }
    });

    if (!campaign) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    // Update status dan urutan wakif
    const updatedTransaction = await db.transaction.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        numberOfWakif: campaign.numberOfWakif + 1
      }
    });

    const { amount } = updatedTransaction;
    const { largestWakaf } = currentUser;

    // Update data wakaf dan berwakaf user
    await db.user.update({
      where: { id: currentUser.id },
      data: {
        berwakafCount: {
          increment: 1
        },
        berwakafTotal: {
          increment: amount
        },
        largestWakaf: amount > largestWakaf ? amount : largestWakaf
      }
    });

    // Update data campaign
    const updatedCampaign = await db.campaign.update({
      where: { id: campaign.id },
      data: {
        numberOfWakif: {
          increment: 1
        },
        collected: {
          increment: amount
        },
        remaining: {
          decrement: amount
        }
      }
    });

    // Update data campaign jika sudah mencapai target
    if ((updatedCampaign.collected >= updatedCampaign.target) && updatedCampaign.status === 'RUNNING') {
      await db.campaign.update({
        where: { id: campaign.id },
        data: {
          status: 'REACHED'
        }
      })
    }

    return NextResponse.json(updatedTransaction, {
      status: 201
    });

  } catch (error: any) {
    console.log('POST COMPLETED STATUS TRANSACTION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}