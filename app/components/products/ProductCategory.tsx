import { Separator } from '@/app/components/ui/separator';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

import { MotionPreset } from '@/app/components/ui/motion-preset';
import { FootprintsIcon, ShirtIcon } from 'lucide-react';
import { GiHoodie } from 'react-icons/gi';

import { getCategories } from '@/lib/actions/products';
import Link from 'next/link';

const ProductCategory = async () => {
  const categories = await getCategories();

  return (
    <section className='pt-10 md:pb-6'>
      <div className='space-y-6 md:space-y-10'>
        <div className='space-y-4 text-center'>
          <MotionPreset
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant='outline'
              className='text-sm font-normal border-amber-400'
            >
              Category
            </Badge>
          </MotionPreset>
          <MotionPreset
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
            delay={0.3}
          >
            <h2 className='font-semibold text-3xl lg:text-4xl'>
              Browse by category
            </h2>
          </MotionPreset>
        </div>
        <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {categories.map((cat, index) => (
            <MotionPreset
              key={index}
              fade
              blur
              slide={{ direction: 'down', offset: 15 }}
              transition={{ duration: 0.8 }}
              delay={0.6 + index * 0.15}
            >
              <Link
                href={`/products?category=${cat.category}`}
                className='hover:ring-amber-400 max-lg:focus:ring-amber-400 bg-muted block w-full items-center rounded-md px-6 py-4 transition-all duration-300 hover:ring-2 max-lg:focus:ring-2'
              >
                <div className='flex items-center gap-6'>
                  {cat.category.includes('Sneakers') ? (
                    <FootprintsIcon className='size-9.5 shrink-0 stroke-1' />
                  ) : cat.category.includes('Sweatshirts') ? (
                    <GiHoodie className='size-9.5 shrink-0 stroke-1' />
                  ) : (
                    <ShirtIcon className='size-9.5 shrink-0 stroke-1' />
                  )}
                  <Separator orientation='vertical' className='!h-12' />
                  <div className='space-y-1'>
                    <h3 className='text-2xl font-semibold'>{cat.category}</h3>
                    <p className='text-muted-foreground text-lg'>
                      {cat.count} {cat.count > 1 ? 'Products' : 'Product'}{' '}
                      Available
                    </p>
                  </div>
                </div>
              </Link>
            </MotionPreset>
          ))}
        </div>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 15 }}
          transition={{ duration: 0.5 }}
          delay={1.5}
          className='w-full max-w-xs mx-auto'
        >
          <Button asChild size='lg' className='rounded-lg text-base w-full'>
            <Link href='/products'>Explore All Categories</Link>
          </Button>
        </MotionPreset>
      </div>
    </section>
  );
};

export default ProductCategory;
