import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const get5UsersByEmailKeyword = async (search: string) => {
  try {
    const users = await db.user.findMany({
      where: {
        AND: [
          {
            email: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            role: 'USER'
          }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      take: 5
    });

    return users
  } catch {
    return null;
  }
}