'use server';

import { auth } from '../auth';
import { createReviewSchema } from '@/schema/productSchema';
import { CreateReview } from '@/types';
import { headers } from 'next/headers';
import prisma from '../prisma';

export const getAllReviewsByProductId = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: { productId: productId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          emailVerified: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return reviews;
};

export const getUserReviewsByProductId = async (productId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error('You must be logged in to submit a review.');

  const review = await prisma.review.findFirst({
    where: {
      userId: session.user.id,
      productId: productId,
    },
  });

  if (!review) return;

  return review;
};

export const createAndUpdateReview = async (
  data: CreateReview,
  productId: string
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('You must be logged in to submit a review.');

    const validatedData = createReviewSchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid review data.');

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) throw new Error('Product not found.');

    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        productId: product.id,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (existingReview) {
        await tx.review.update({
          where: { id: existingReview.id },
          data: validatedData.data,
        });
      } else {
        await tx.review.create({
          data: {
            ...validatedData.data,
            userId: session.user.id,
            productId: product.id,
          },
        });
      }

      const avgRating = await tx.review.aggregate({
        where: { productId: product.id },
        _avg: { rating: true },
      });

      const numReviews = await tx.review.count({
        where: { productId: product.id },
      });

      await tx.product.update({
        where: { id: product.id },
        data: {
          rating: avgRating._avg.rating || 0,
          numReviews: numReviews,
        },
      });
    });

    return { success: true, message: 'Review submitted successfully.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
