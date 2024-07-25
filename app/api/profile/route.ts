import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
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

    const currentData = await db.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        address,
        institution,
        name,
        phoneNumber,
        image: image as string,
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