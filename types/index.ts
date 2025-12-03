import z from 'zod';
import {
  baseProductSchema,
  createAndUpdateReviewSchema,
  createProductSchema,
  updateProductSchema,
} from '@/schema/productSchema';
import { cartItemSchema, cartSchema } from '@/schema/cartSchema';
import {
  paymentMethodSchema,
  paymentResultsSchema,
  shippingSchema,
} from '@/schema/checkoutSchema';
import { orderItemSchema, orderSchema } from '@/schema/orderSchema';
import { updateUserPubInfoSchema } from '@/schema/userSchema';
import { createAndUpdateReview } from '@/lib/actions/review';

export type Product = z.infer<typeof baseProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
};

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type Shipping = z.infer<typeof shippingSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type OrderItems = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema> & {
  id: string;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  createdAt: Date;
  user: { name: string; email: string };
  orderItems: OrderItems[];
};

export type PaymentResults = z.infer<typeof paymentResultsSchema>;
export type UpdateUserPubInfo = z.infer<typeof updateUserPubInfoSchema> & {
  image?: string | null;
};

export type CreateProduct = z.infer<typeof createProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;

export type ProductReview = z.infer<typeof createAndUpdateReviewSchema> & {
  id: string;
  createdAt: Date;
  user: { name: string; emailVerified: boolean | null };
  userId: string;
  productId: string;
};

export type CreateReview = z.infer<typeof createAndUpdateReviewSchema>;
