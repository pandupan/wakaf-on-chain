import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { formatRupiah, isAdmin } from "@/lib/utils";
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

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
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

    if (status === 'CLOSED') {
      await db.notification.create({
        data: {
          campaignId: campaign.id,
          title: 'Kampanye dinonaktifkan sementara',
          type: 'WARNING',
          role: 'ADMIN',
          message: `
            Kampanye dengan judul <b>${campaign.title}</b> di nonaktifkan 
            sementara oleh <b>${currentUser.name}</b>. Admin dapat mengaktifkan kapan 
            saja kampanye tersebut menjadi aktif kembali di halaman 
            <a href="/dashboard/management" target="_blank" rel="noopener noreferrer">
              kelola kampanye
            </a>.
          `
        }
      })
    } else if (status === 'RUNNING') {
      await db.notification.create({
        data: {
          campaignId: campaign.id,
          title: 'Kampanye diaktifkan kembali',
          type: 'PENDING',
          role: 'ADMIN',
          message: `
            Kampanye dengan judul <b>${campaign.title}</b> di aktifkan 
            kembali oleh <b>${currentUser.name}</b>. Anda dapat melihat detail kampanye tersebut di  
            <a href="/dashboard/campaign/${campaign.id}" target="_blank" rel="noopener noreferrer">
              halaman detail
            </a>.
          `
        }
      })
    } else {
      await db.notification.create({
        data: {
          campaignId: campaign.id,
          title: 'Hore... kampanye sudah mencapai target😍',
          type: 'SUCCESS',
          role: 'ADMIN',
          message: `
            Kampanye dengan judul <b>${campaign.title}</b> telah dianggap mencapai 
            target oleh <b>${currentUser.name}</b> dengan wakaf terkumpul sebesar 
            ${formatRupiah(updatedCampaign.collected)}. Anda dapat melihat detail kampanye tersebut di  
            <a href="/dashboard/campaign/${campaign.id}" target="_blank" rel="noopener noreferrer">
              halaman detail
            </a>. Silahkan hubungi admin tersebut jika ada masalah atau kendala mengenai hal ini.
          `
        }
      })
    }

    return NextResponse.json(updatedCampaign, {
      status: 201
    });

  } catch (error: any) {
    console.log('CHANGE STATUS CAMPAIGN ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}