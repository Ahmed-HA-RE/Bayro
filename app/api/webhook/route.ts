import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature')!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'checkout.session.completed') {
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: event.data.object.metadata?.orderId },
        data: {
          paidAt: new Date(),
          isPaid: true,
          paymentResult: {
            id: event.data.object.id,
            status: event.data.object.status,
            email_address: event.data.object.customer_email,
            pricePaid: Math.round(event.data.object.amount_total! / 100),
          },
        },
        include: { orderItems: true },
      });
      for (const item of order.orderItems) {
        await tx.product.updateMany({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.qty },
          },
        });
      }
    });
    return NextResponse.json({ message: 'Payment processed successfully' });
  } else {
    return NextResponse.json({ message: 'Payment Failed' });
  }
};
