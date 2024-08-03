import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { cloudinary, preset, uploadImage } from "@/lib/cloudinary"
import { db } from "@/lib/db"
import { getPublicIdFromUrl } from "@/lib/utils"
import { profileSchema } from "@/schemas"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body: z.infer<typeof profileSchema> = await req.json();

    const validatedFields = profileSchema.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse('Invalid inputs', { status: 400 })
    }

    const {
      address,
      institution,
      name,
      phoneNumber,
      image,
      profession
    } = validatedFields.data;

    if (image) {
      const result: any = await uploadImage(image as string, preset.default, 'user_profiles');

      const currentData = await db.user.update({
        where: {
          id: currentUser.id
        },
        data: {
          address,
          institution,
          name,
          phoneNumber,
          image: result.secure_url,
          profession
        },
      });

      if (currentUser.image && currentUser.image.includes('res.cloudinary.com')) {
        const id = `user_profiles/${getPublicIdFromUrl(currentUser.image)}`
        await cloudinary.uploader.destroy(id, { resource_type: 'image' })
      }

      return NextResponse.json(currentData, {
        status: 201
      });
    }

    const currentData = await db.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        address,
        institution,
        name,
        phoneNumber,
        profession
      },
    });

    return NextResponse.json(currentData, {
      status: 201
    });
  } catch (error: any) {
    console.log('UPDATE PROFILE ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}