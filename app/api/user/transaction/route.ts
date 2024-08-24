import { auth } from "@/auth";
import { getAllTransactions } from "@/data/transaction";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";
import { transactionSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from 'nanoid';

const MIDTRANS_APP_URL = process.env.MIDTRANS_APP_URL;

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

    const transactionId = `TRX-${nanoid(4)}-${nanoid(8)}`;
    const authString = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`);

    const nameToArray = (currentUser.name || 'Anonim').split(' ');
    const callbackUrl = new URL(req.url).origin;

    const payload = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: +amount,
      },
      customer_details: {
        first_name: nameToArray[0],
        last_name: nameToArray.length === 1 ? '' : nameToArray.slice(1).join(' '),
        email: currentUser.email,
        phone: currentUser.phoneNumber || currentUser.email
      },
      callbacks: {
        finish: `${callbackUrl}/dashboard/transaction/${transactionId}`,
        error: `${callbackUrl}/dashboard/transaction/${transactionId}`,
        pending: `${callbackUrl}/dashboard/transaction/${transactionId}`,
      }
    }

    const resMidtransApp = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      body: JSON.stringify(payload)
    })

    const data = await resMidtransApp.json();

    if (resMidtransApp.status !== 201) {
      return new NextResponse('Failed to create transaction', { status: 500 })
    }

    const newTransaction = await db.transaction.create({
      data: {
        id: transactionId,
        amount: +amount,
        email,
        paymentMethodId,
        paymentMethodLabel,
        campaignId: campaign.id,
        userId,
        message: message || null,
        name: name,
        isHiddenName,
        snapRedirectUrl: data.redirect_url,
        snapToken: data.token,
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