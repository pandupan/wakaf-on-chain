import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { formatRupiah } from "@/lib/utils";
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

    if (
      !transaction ||
      (transaction.status !== 'PENDING') ||
      (transaction.userId !== currentUser.id)
    ) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const campaign = await db.campaign.findUnique({
      where: { id: transaction.campaignId }
    })

    if (!campaign) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const updatedTransaction = await db.transaction.update({
      where: { id },
      data: {
        status: 'FAILED'
      }
    });

    await db.notification.create({
      data: {
        userId: transaction.userId,
        title: 'Transaksi wakaf gagal',
        type: 'ERROR',
        message: `
          Serah terima wakaf pada kampanye  
          <b>${campaign.title}</b> 
          dengan nominal ${formatRupiah(transaction.amount)} gagal dilakukan. 
          Hal ini terjadi karena batas pembayaran wakaf telah kadaluarsa 
          atau anda membatalkannya dihalaman transaksi detail. Lihat lebih rinci di  
          <a href="/wakaf-statement/${transaction.id}" target="_blank" rel="noopener noreferrer">
            halaman transaksi
          </a>.
        `
      }
    })

    return NextResponse.json(updatedTransaction, {
      status: 201
    });

  } catch (error: any) {
    console.log('POST FAILED STATUS TRANSACTION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}