'use client';

import { Cart } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { SERVER_URL } from '@/lib/constants';

type CartTotalCardProps = {
  cart: Cart;
  session: typeof auth.$Infer.Session | null;
};

const CartTotalCard = ({ cart, session }: CartTotalCardProps) => {
  const totalItems = cart.items.reduce((acc, c) => acc + c.qty, 0) || 0;
  return (
    <Card className='order-1 md:order-2 dark:dark-border-color w-full col-span-2 gap-6'>
      <CardHeader className='md:px-3'>
        <CardTitle className='font-bold text-2xl'>
          Subtotal ({totalItems}):
        </CardTitle>
      </CardHeader>
      <CardContent className='md:px-3 '>
        {/* Shipping */}
        <div className='flex flex-row justify-between items-center'>
          <p>Shipping:</p>
          <div className='flex flex-row justify-end items-center gap-0.5 dark:text-orange-400'>
            <p className='dirham-symbol'>&#xea;</p>
            <p>{cart.shippingPrice}</p>
          </div>
        </div>
        <Separator className='my-4' />
        {/* Tax */}
        <div className='flex flex-row justify-between items-center'>
          <p>Tax:</p>
          <div className='flex flex-row justify-end items-center gap-0.5 dark:text-orange-400'>
            <p className='dirham-symbol'>&#xea;</p>
            <p>{cart.taxPrice}</p>
          </div>
        </div>
        <Separator className='my-4' />
        {/* Total */}
        <div className='flex flex-row justify-between items-center '>
          <p>Total:</p>
          <div className='flex flex-row justify-end items-center gap-0.5 dark:text-orange-400'>
            <p className='dirham-symbol'>&#xea;</p>
            <p>{cart.totalPrice}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='md:px-3'>
        <Button
          asChild
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
        >
          <Link
            href={
              !session
                ? `/signin?callbackUrl=${SERVER_URL}/checkout/shipping-address`
                : '/checkout/shipping-address'
            }
          >
            Proceed to Checkout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartTotalCard;
