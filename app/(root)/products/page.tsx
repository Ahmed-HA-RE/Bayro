import ProductCard from '@/app/components/products/ProductCard';
import ProductsPagination from '@/app/components/products/ProductsPagination';
import { loadSearchParams } from '@/lib/search-params/products';
import type { SearchParams } from 'nuqs';
import { Alert, AlertTitle } from '@/app/components/ui/alert';
import { getAllProducts } from '@/lib/actions/products';
import { TriangleAlertIcon } from 'lucide-react';
import ProductSort from '@/app/components/products/ProductSort';
import { Card } from '@/app/components/ui/card';

type ProductsPageProps = {
  searchParams: Promise<SearchParams>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { q, price, category, rate, sort, page } =
    await loadSearchParams(searchParams);

  const data = await getAllProducts({ page, query: q, category, sort });
  console.log(data);

  return (
    <section className='mt-4'>
      {!data.products || data.products?.length === 0 ? (
        <Alert
          variant='destructive'
          className='border-destructive max-w-md mx-auto'
        >
          <TriangleAlertIcon />
          <AlertTitle>No products found.</AlertTitle>
        </Alert>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
          {/* filters */}
          <aside className='md:col-span-2'>
            <Card className='dark:dark-border-color'>
              {/* Price Filter */}
              {/* Rate Filter */}
            </Card>
          </aside>
          {/* Products + Sort */}
          <div className='md:col-span-5'>
            <ProductSort querySort={sort} />
            {/* Products Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5'>
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* Pagination */}
            {page > 1 && <ProductsPagination totalPages={data.totalPages} />}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
