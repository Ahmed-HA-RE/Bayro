'use client';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedCarousel = ({ products }: { products: Product[] }) => {
  return (
    <section className=''>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <Link href={`/product/${product.slug}`}>
                <div className='relative'>
                  <Image
                    src={product.banner!}
                    alt={product.name}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-[250px] md:h-[400px] w-full object-cover rounded-sm'
                  />
                  <h4 className='absolute bottom-0 w-full flex flex-row items-center justify-center py-3 bg-gray-900/70 text-white mx-auto font-bold text-2xl md:text-3xl'>
                    {product.name}
                  </h4>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='hidden md:block'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
};

export default FeaturedCarousel;
