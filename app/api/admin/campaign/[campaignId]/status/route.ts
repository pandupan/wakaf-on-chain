import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { CampaignStatus } from "@prisma/client";
import { NextResponse } from "next/server"

interface IParams {
  campaignId?: number;
}

export async function PATCH(req: Request, { params }: { params: IParams }) {
  try {
    const { campaignId } = params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || currentUser.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body: { status: CampaignStatus } = await req.json();
    const { status } = body;

    if (!status || !campaignId || isNaN(+campaignId)) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const campaign = await db.campaign.findUnique({ where: { id: +campaignId } });

    if (!campaign || (campaign.status === 'REACHED')) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const updatedCampaign = await db.campaign.update({
      where: { id: +campaignId },
      data: {
        status
      }
    });

    return NextResponse.json(updatedCampaign, {
      status: 201
    });

  } catch (error: any) {
    console.log('CHANGE STATUS ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}