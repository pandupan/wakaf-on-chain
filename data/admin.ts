import { db } from "@/lib/db"

export const getAllAdmins = async () => {
  try {
    const admins = await db.user.findMany({
      where: {
        OR: [
          { role: 'ADMIN' },
          { role: 'SUPER_ADMIN' }
        ]
      },
      orderBy: {
        role: 'asc'
      },
      select: {
        id: true,
        name: true,
        image: true,
        role: true,
        email: true,
        adminRecruitedAt: true,
      },
    });

    return admins
  } catch {
    return null;
  }
}