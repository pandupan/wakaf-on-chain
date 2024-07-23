import { auth } from "@/auth"
import { getAllCampaigns } from "@/data/campaign"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { campaignSchemaRaw } from "@/schemas"
import { NextResponse } from "next/server"
import { z } from "zod"

const campaignSchemaResponse = z.object({
  ...campaignSchemaRaw,
  image: z.string().min(1, {
    message: 'Gambar harus diisi.'
  }),
  imageDetail1: z.string().optional(),
  imageDetail2: z.string().optional(),
  imageDetail3: z.string().optional(),
  imageDetail4: z.string().optional(),
  imageDetail5: z.string().optional(),
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
      title,
      imageDetail1,
      imageDetail2,
      imageDetail3,
      imageDetail4,
      imageDetail5
    } = validatedFields.data;

    const newCampaign = await db.campaign.create({
      data: {
        image,
        imageDetail1: imageDetail1,
        imageDetail2: imageDetail2,
        imageDetail3: imageDetail3,
        imageDetail4: imageDetail4,
        imageDetail5: imageDetail5,
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

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || currentUser.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();

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
      title,
      imageDetail1,
      imageDetail2,
      imageDetail3,
      imageDetail4,
      imageDetail5
    } = validatedFields.data;

    const campaign = await db.campaign.findUnique({
      where: { id: body.id }
    });

    if (!campaign) {
      return new NextResponse('Data not found', { status: 404 });
    }

    const newCampaign = await db.campaign.update({
      where: {
        id: body.id,
      },
      data: {
        image,
        imageDetail1,
        imageDetail2,
        imageDetail3,
        imageDetail4,
        imageDetail5,
        title,
        target: +target,
        category,
        description,
        phone,
        remaining: +target - campaign.collected
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

    if (!currentUser?.id || !currentUser?.email || currentUser.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const parsedCursor = cursor && !isNaN(+cursor) ? parseInt(cursor, 10) : undefined;
    const parsedLimit = limit && !isNaN(+limit) ? parseInt(limit, 10) : 9;

    const campaigns = await getAllCampaigns({
      includeUser: true,
      cursor: parsedCursor,
      limit: parsedLimit,
      search,
      sorted: 'updatedAt'
    });

    if (campaigns === null) throw new Error('Error when get campaigns');

    return NextResponse.json(campaigns, {
      status: 200
    })
  } catch (error: any) {
    console.log('GET ADMIN CAMPAIGNS ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}