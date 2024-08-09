import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { formatRupiah, isAdmin } from "@/lib/utils";
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

    if (!id) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const withdrawal = await db.withdrawalRequest.findUnique({ where: { id } });

    if (!withdrawal || (withdrawal.status !== 'PENDING')) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const body = await req.json();
    const rejectedNote = body.rejectedNote;

    if (!rejectedNote) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const updatedWithdrawal = await db.withdrawalRequest.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectedNote
      },
      include: {
        campaign: {
          select: {
            title: true,
            id: true
          }
        }
      }
    });

    await db.campaign.update({
      where: { id: updatedWithdrawal.campaignId },
      data: {
        availableBalance: {
          increment: updatedWithdrawal.amount
        }
      }
    })

    await db.notification.create({
      data: {
        userId: updatedWithdrawal.userId,
        title: 'Permintaan penarikan ditolak',
        type: 'ERROR',
        message: `
          Permintaan penarikan pada kampanye <b>${updatedWithdrawal.campaign.title}</b> 
          dengan nominal ${formatRupiah(updatedWithdrawal.amount)} telah ditolak oleh ${currentUser.name}. 
          Lihat alasan penolakannya di halaman 
          <a href="/dashboard/request-withdrawal/${updatedWithdrawal.id}" target="_blank" rel="noopener noreferrer">
            detail penarikan
          </a>.
        `
      }
    })

    return NextResponse.json(updatedWithdrawal, {
      status: 200
    });

  } catch (error: any) {
    console.log('REJECTED REQUEST WD ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}