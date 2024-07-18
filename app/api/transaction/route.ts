import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
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
      name
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
        name: name || null
      },
    });

    return NextResponse.json(newTransaction, {
      status: 201
    });
  } catch (error: any) {
    console.log('CREATE TRANSACTION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}