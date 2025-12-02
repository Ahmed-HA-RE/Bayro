import ProductCard from '@/app/components/products/ProductCard';
import ProductsPagination from '@/app/components/products/ProductsPagination';
import { loadSearchParams } from '@/lib/search-params/products';
import type { SearchParams } from 'nuqs';
import { Alert, AlertTitle } from '@/app/components/ui/alert';
import { getAllProducts } from '@/lib/actions/products';
import { TriangleAlertIcon } from 'lucide-react';
import ProductFilter from '@/app/components/products/ProductFilter';
import { getCategories } from '@/lib/actions/products';
import { getProductsCount } from '@/lib/actions/products';
import { Metadata } from 'next';

type ProductsPageProps = {
  searchParams: Promise<SearchParams>;
};

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}): Promise<Metadata> => {
  const { q, price, category } = await searchParams;

  if (q || price || category) {
    return {
      title: `
      ${q && 'Search ' + q} ${category ? ': Category ' + category : ''} ${price ? ': Price ' + price : ''}
      `,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { q, price, category, sort, page } =
    await loadSearchParams(searchParams);

  const data = await getAllProducts({ page, query: q, category, sort, price });

  const categories = await getCategories();
  const totalProducts = await getProductsCount();

  return (
    <section className='mt-4'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight text-balance'>
          Product Catalog
        </h2>
        <p className='text-muted-foreground mt-2'>
          Browse our collection of {totalProducts} products
        </p>
      </div>
      <ProductFilter categories={categories} />
      {!data.products || data.products?.length === 0 ? (
        <Alert
          variant='destructive'
          className='border-destructive max-w-md mx-auto'
        >
          <TriangleAlertIcon />
          <AlertTitle>No products found.</AlertTitle>
        </Alert>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5'>
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Pagination */}
          {page > 1 && <ProductsPagination totalPages={data.totalPages} />}
        </>
      )}
    </section>
  );
};

export default ProductsPage;
