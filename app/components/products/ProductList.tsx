import { Alert, AlertTitle } from '../ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import ProductCard from './ProductCard';
import { getLatestProducts } from '../../../lib/actions/products';
import { Button } from '../ui/button';
import Link from 'next/link';

const ProductList = async () => {
  const products = await getLatestProducts();
  return (
    <section className='mt-8'>
      <h2 className='mb-6 font-bold text-3xl md:text-4xl'>Newest Arrivals</h2>
      {products.length === 0 ? (
        <Alert className='bg-destructive/10 text-destructive border-none max-w-lg mx-auto'>
          <TriangleAlertIcon />
          <AlertTitle>No products found</AlertTitle>
        </Alert>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className='mt-6 max-w-xs mx-auto'>
            <Button className='text-base w-full' size={'lg'} asChild>
              <Link href='/products'>View All Products</Link>
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
