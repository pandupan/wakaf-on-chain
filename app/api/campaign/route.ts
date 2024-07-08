import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { campaignSchemaRaw } from "@/schemas"
import { NextResponse } from "next/server"
import { z } from "zod"

const campaignSchemaResponse = z.object({
  ...campaignSchemaRaw,
  image: z.string().min(1, {
    message: 'Gambar harus diisi.'
  })
})

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || currentUser.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body: z.infer<typeof campaignSchemaResponse> = await req.json();

    const validatedFields = campaignSchemaResponse.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse('Invalid inputs', { status: 400 })
    }

    const {
      category,
      description,
      image,
      phone,
      target,
      title
    } = validatedFields.data;

    const newCampaign = await db.campaign.create({
      data: {
        image,
        title,
        target: +target,
        category,
        description,
        phone,
        remaining: +target,
        creatorId: currentUser.id,
      },
    });

    return NextResponse.json(newCampaign, {
      status: 201
    });

  } catch (error: any) {
    console.log('CREATE CAMPAIGN ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}