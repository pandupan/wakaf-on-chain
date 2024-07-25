import { auth } from "@/auth";
import { getAllTransactions } from "@/data/transaction";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";
import { transactionSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { z } from "zod";

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

    const body: z.infer<typeof transactionSchema> = await req.json();

    const validatedFields = transactionSchema.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse('Invalid inputs', { status: 400 })
    }

    const {
      amount,
      campaignId,
      email,
      paymentMethodId,
      paymentMethodLabel,
      userId,
      message,
      name,
      isHiddenName
    } = validatedFields.data;

    const campaign = await db.campaign.findUnique({
      where: { id: campaignId }
    });

    if (!campaign) {
      return new NextResponse('Campaign not found', { status: 404 })
    }

    const newTransaction = await db.transaction.create({
      data: {
        amount: +amount,
        email,
        paymentMethodId,
        paymentMethodLabel,
        campaignId: campaign.id,
        userId,
        message: message || null,
        name: name,
        isHiddenName
      },
    });

    await db.notification.create({
      data: {
        userId: newTransaction.userId,
        title: 'Lakukan pembayaran',
        type: 'PENDING',
        message: `
          Segera lakukan pembayaran transaksi wakaf pada kampanye  
          <b>${campaign.title}</b> 
          dengan nominal ${formatRupiah(newTransaction.amount)}. 
          Transaksi ini hanya berlaku untuk 1 jam kedepan, 
          jika melebihi transaksi secara otomatis dibatalkan. Lakukan pembayaran di 
          <a href="/dashboard/transaction/${newTransaction.id}" target="_blank" rel="noopener noreferrer">
            halaman transaksi
          </a>.
        `
      }
    })

    return NextResponse.json(newTransaction, {
      status: 201
    });
  } catch (error: any) {
    console.log('CREATE TRANSACTION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const cursor = searchParams.get('cursor');
  const limit = searchParams.get('limit');
  const search = searchParams.get('search') || '';

  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const parsedCursor = cursor || '';
    const parsedLimit = limit && !isNaN(+limit) ? parseInt(limit, 10) : 9;

    const transactions = await getAllTransactions({
      cursor: parsedCursor,
      limit: parsedLimit,
      search,
      userId: currentUser.id
    });

    if (transactions === null) throw new Error('Error when get transactions');

    return NextResponse.json(transactions, {
      status: 200
    })
  } catch (error: any) {
    console.log('GET USER TRANSACTIONS ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}