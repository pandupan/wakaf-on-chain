import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { preset, uploadImage } from "@/lib/cloudinary";
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
    const proofPayment = body.proofPayment;

    if (!proofPayment) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const result: any = await uploadImage(proofPayment as string, preset.default, 'withdrawal');

    const updatedWithdrawal = await db.withdrawalRequest.update({
      where: { id },
      data: {
        proofPayment: result.secure_url,
        status: 'APPROVED'
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

    await db.notification.create({
      data: {
        userId: updatedWithdrawal.userId,
        title: 'Permintaan penarikan disetujui',
        type: 'SUCCESS',
        message: `
          Permintaan penarikan pada kampanye <b>${updatedWithdrawal.campaign.title}</b> 
          dengan nominal ${formatRupiah(updatedWithdrawal.amount)} telah disetujui oleh ${currentUser.name}. 
          Lihat bukti transfer di halaman 
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
    console.log('APPROVED REQUEST WD ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}