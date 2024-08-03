import { auth } from "@/auth"
import { getAllCampaigns } from "@/data/campaign"
import { getUserById } from "@/data/user"
import { cloudinary, preset, uploadImage } from "@/lib/cloudinary"
import { db } from "@/lib/db"
import { formatRupiah, getPublicIdFromUrl, isAdmin } from "@/lib/utils"
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

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
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
      phone,
      target,
      title,
      image,
      imageDetail1,
      imageDetail2,
      imageDetail3,
      imageDetail4,
      imageDetail5
    } = validatedFields.data;

    const images = [
      image,
      imageDetail1,
      imageDetail2,
      imageDetail3,
      imageDetail4,
      imageDetail5
    ].filter((image) => typeof image === 'string')

    const uploadPromises = images.map(file => {
      return cloudinary.uploader.unsigned_upload(
        file as string,
        preset.default,
        { folder: 'campaigns' }
      );
    });

    const results = await Promise.all(uploadPromises);

    const resultImages = results.map(result => result.secure_url);

    const newCampaign = await db.campaign.create({
      data: {
        image: resultImages[0],
        imageDetail1: resultImages[1],
        imageDetail2: resultImages[2],
        imageDetail3: resultImages[3],
        imageDetail4: resultImages[4],
        imageDetail5: resultImages[5],
        title,
        target: +target,
        category,
        description,
        phone,
        remaining: +target,
        creatorId: currentUser.id,
      },
    });

    await db.notification.create({
      data: {
        campaignId: newCampaign.id,
        title: 'Pembuatan kampanye berhasil',
        type: 'PENDING',
        role: 'ADMIN',
        message: `
          Admin ${currentUser.name} telah membuat kampanye dengan judul 
          <b>${newCampaign.title}</b> dengan target sebesar ${formatRupiah(newCampaign.target)}. 
          Kampanye sedang berjalan dan anda dapat melihat detail kampanye tersebut di  
          <a href="/dashboard/campaign/${newCampaign.id}" target="_blank" rel="noopener noreferrer">
            halaman detail
          </a>.
        `
      }
    })

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

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
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
      return new NextResponse('Invalid inputs', { status: 400 });
    }

    const images = [
      campaign.image,
      campaign.imageDetail1,
      campaign.imageDetail2,
      campaign.imageDetail3,
      campaign.imageDetail4,
      campaign.imageDetail5,
    ]

    const currentImages: (string | null | undefined)[] = [
      image,
      imageDetail1,
      imageDetail2,
      imageDetail3,
      imageDetail4,
      imageDetail5,
    ]

    for (let i = 0; i < currentImages.length; i++) {
      if (!!currentImages[i] && currentImages[i]!.includes('data:image/png;base64,')) {
        const result: any = await uploadImage(currentImages[i]!, preset.default, 'campaigns');
        currentImages[i] = result.secure_url;

        if (!!images[i] && images[i]!.includes('res.cloudinary.com')) {
          const id = `campaigns/${getPublicIdFromUrl(images[i]!)}`
          await cloudinary.uploader.destroy(id, { resource_type: 'image' })
        }
      } else if (!currentImages[i] && images[i]?.includes('res.cloudinary.com')) {
        const id = `campaigns/${getPublicIdFromUrl(images[i]!)}`
        await cloudinary.uploader.destroy(id, { resource_type: 'image' })
        currentImages[i] = null;
      }
    }

    const updatedCampaign = await db.campaign.update({
      where: {
        id: body.id,
      },
      data: {
        image: currentImages[0]!,
        imageDetail1: currentImages[1],
        imageDetail2: currentImages[2],
        imageDetail3: currentImages[3],
        imageDetail4: currentImages[4],
        imageDetail5: currentImages[5],
        title,
        target: +target,
        category,
        description,
        phone,
        remaining: +target - campaign.collected
      },
    });

    return NextResponse.json(updatedCampaign, {
      status: 200
    });
  } catch (error: any) {
    console.log('EDIT CAMPAIGN ERROR: ', error);
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

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
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