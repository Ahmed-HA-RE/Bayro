import { Product } from '@/types';
import { Alert, AlertTitle } from '../ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  limit?: number;
};

const ProductList = ({ products, limit }: ProductListProps) => {
  const limitedProducts = products.slice(0, limit);

  return (
    <section className='mt-12'>
      <h2 className='mb-6 font-bold text-3xl md:text-4xl'>Newest Arrivals</h2>
      {limitedProducts.length === 0 ? (
        <Alert className='bg-destructive/10 text-destructive border-none max-w-lg mx-auto'>
          <TriangleAlertIcon />
          <AlertTitle>No products found</AlertTitle>
        </Alert>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {limitedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
