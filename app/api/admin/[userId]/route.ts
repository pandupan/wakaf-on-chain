import { auth } from "@/auth"
import { get5UsersByEmailKeyword, getUserById } from "@/data/user"
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server"

interface IParams {
  userId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const { role }: { role: UserRole } = await req.json();
    const { userId } = params;
    if (!userId || !role) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const superAdminCount = await db.user.count({
      where: { role: 'SUPER_ADMIN' }
    })

    if (superAdminCount >= 3) {
      return new NextResponse('Super Admin sudah mencapai batas', { status: 400 });
    }

    const adminCount = await db.user.count({
      where: { role: 'ADMIN' }
    })

    if (adminCount >= 10) {
      return new NextResponse('Admin sudah mencapai batas', { status: 400 });
    }

    const updatedAdmin = await db.user.update({
      where: { id: userId },
      data: {
        role,
        adminRecruitedAt: new Date()
      }
    })

    await db.notification.create({
      data: {
        userId,
        type: 'GENERAL',
        title: 'Wow... Anda dipromosikan oleh admin🤩',
        message: `
          Hallo ${updatedAdmin.name} sekarang anda telah menjadi 
          <b>${updatedAdmin.role.replace('_', '')}</b> yang dipromosikan oleh 
          <b>${currentUser.name}</b>. Sekarang anda dapat membuka beberapa 
          halaman yang tidak ada sebelumnya.
        `,
      }
    })

    return NextResponse.json(updatedAdmin, {
      status: 200
    })
  } catch (error: any) {
    console.log('POST USER TO ADMIN ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    if (!userId) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email || !isAdmin(currentUser.role)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedAdmin = await db.user.update({
      where: { id: userId },
      data: {
        role: 'USER',
        adminRecruitedAt: null
      }
    })

    await db.notification.create({
      data: {
        userId,
        type: 'WARNING',
        title: 'Jabatan sebagai admin dihapus',
        message: `
          Hallo ${updatedAdmin.name} sekarang anda bukan lagi menjadi 
          <b>ADMIN/SUPER ADMIN</b>. Hubungi SUPER ADMIN jika ada masalah atau 
          hal lain mengenai ini.
        `,
      }
    })

    return NextResponse.json(updatedAdmin, {
      status: 200
    })
  } catch (error: any) {
    console.log('DELETE ADMIN ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}