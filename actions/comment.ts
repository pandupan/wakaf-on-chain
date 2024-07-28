"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const postComment = async (message: string, campaignId: number) => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return { error: 'Unauthorized' };
    }

    const commentCount = await db.campaignComment.count({
      where: {
        campaignId,
        userId: session.user.id
      }
    })

    if (commentCount > 10) {
      return { error: 'Anda telah melewati batas komentar yang telah ditentukan!' }
    }

    const newComment = await db.campaignComment.create({
      data: {
        userId: session.user.id,
        campaignId,
        comment: message,
      },
      include: {
        user: {
          select: {
            id: true,
            image: true,
            name: true
          }
        }
      }
    })

    return {
      success: 'Post campaign comment successfully',
      data: newComment
    }
  } catch (error) {
    console.log('POST CAMPAIGN COMMENT ERROR: ', error);
    return { error: 'Internal error' }
  }
}