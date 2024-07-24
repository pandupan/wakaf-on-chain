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

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    if (!id || !body.userId || !body.campaignId) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const campaign = await db.campaign.findUnique({
      where: { id: body.campaignId }
    })

    if (!campaign) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const transaction = await db.transaction.findUnique({ where: { id } });

    if (
      !transaction ||
      (transaction.status !== 'COMPLETED') ||
      (transaction.userId !== body.userId) ||
      (transaction.campaignId !== body.campaignId)
    ) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const updatedTransaction = await db.transaction.update({
      where: { id },
      data: {
        statementVerified: true
      }
    });

    await db.notification.create({
      data: {
        userId: body.userId,
        title: 'Verifikasi wakaf berhasil',
        type: 'VERIFIED',
        message: `
          Selamat wakaf anda pada kampanye 
          <b>${campaign.title}</b> 
          dengan nominal ${formatRupiah(transaction.amount)} telah berhasil diverifikasi. 
          anda mendapatkan surat pernyataan resmi dengan klik tombol 
          <a href="/wakaf-statement/${transaction.id}" target="_blank" rel="noopener noreferrer">
            lihat surat pernyataan
          </a>.
        `
      }
    })

    return NextResponse.json(updatedTransaction, {
      status: 200
    });

  } catch (error: any) {
    console.log('POST VERIFIED WAKAF TRANSACTION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}