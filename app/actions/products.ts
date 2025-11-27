'use server';
import { LIMIT_LIST_PRODUCTS } from '@/lib/constants';
import prisma from '@/lib/prisma';

export const getLatestProducts = async () => {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: LIMIT_LIST_PRODUCTS,
  });
  return data.map((product) => ({
    ...product,
    price: product.price,
    rating: product.rating,
  }));
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: { slug },
  });

  return product;
};

type getAllProductsPrams = {
  page: number;
  query: string;
  category: string;
  limit?: number;
};

export const getAllProducts = async ({
  page,
  query,
  category,
  limit = 10,
}: getAllProductsPrams) => {
  try {
    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

    if (!products) throw new Error('Products not found');

    const totalProducts = await prisma.product.count();

    return {
      products,
      totalPages: Math.ceil(totalProducts / limit),
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
