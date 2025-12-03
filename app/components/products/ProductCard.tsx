import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Product } from '@/types';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { StarIcon } from 'lucide-react';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='h-full gap-6 shadow-none'>
      <CardContent className='flex flex-1 flex-col gap-6'>
        <div className='shrink-0 overflow-hidden rounded-md'>
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={0}
              height={0}
              loading='eager'
              sizes='100vw'
              className='w-full h-[200px] object-cover'
            />
          </Link>
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <div className='flex flex-1 flex-col justify-between gap-2'>
            <Link href={product.slug}>
              <h3 className='text-xl font-medium'>{product.name}</h3>
            </Link>
            <div className='flex items-center gap-3'>
              <Badge className='rounded-sm bg-amber-400 text-white focus-visible:ring-amber-600/20 focus-visible:outline-none dark:focus-visible:ring-amber-400/40'>
                <StarIcon className='size-3' />
                {product.rating}
              </Badge>
              <a
                href={`/product/${product.slug}`}
                className='text-muted-foreground font-medium underline'
              >
                {product.numReviews} Reviews
              </a>
            </div>
          </div>

          <Link href={`/product/${product.slug}`}>
            <div className='flex flex-row items-center gap-0.5 dark:text-orange-400 text-2xl font-semibold'>
              <p className='dirham-symbol'>&#xea;</p>
              <p>{product.price}</p>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
