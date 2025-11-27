import { getAllProducts } from '@/app/actions/products';
import PaginationControls from '@/app/components/Pagination';
import { Alert, AlertTitle } from '@/app/components/ui/alert';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { convertToNumber } from '@/lib/utils';
import { PencilIcon, Trash2Icon, TriangleAlertIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Products',
  description: 'Manage all products in the admin panel.',
};

const AdminProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const page = Number((await searchParams).page) || 1;
  const query = (await searchParams).query || '';
  const category = (await searchParams).category || '';

  const productsData = await getAllProducts({
    page,
    query: query as string,
    category: category as string,
  });

  return (
    <section className='mt-4'>
      <div className='flex flex-row justify-between products-center mb-4'>
        <h1 className='text-3xl md:text-4xl font-bold'>Products</h1>
        <Button asChild>
          <Link href='/admin/products/new'>Add New Product</Link>
        </Button>
      </div>
      {!productsData.products || productsData.products.length === 0 ? (
        <Alert variant='destructive' className='border-destructive'>
          <TriangleAlertIcon />
          <AlertTitle>No products found.</AlertTitle>
        </Alert>
      ) : (
        <div className='w-full'>
          <div className='[&>div]:rounded-sm [&>div]:border [&>div]:border-gray-300 [&>div]:dark:dark-border-color'>
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-transparent dark:dark-border-color border-gray-300'>
                  <TableHead>NAME</TableHead>
                  <TableHead>PRICE</TableHead>
                  <TableHead>CATEGORY</TableHead>
                  <TableHead>STOCK</TableHead>
                  <TableHead>RATING</TableHead>
                  <TableHead className='w-0'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='dark:dark-border-color border-gray-300'>
                {productsData.products.map((product) => (
                  <TableRow
                    key={product.id}
                    className='has-data-[state=checked]:bg-muted/50 dark:dark-border-color border-gray-300'
                  >
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <Avatar className='rounded-sm'>
                          <AvatarImage
                            src={product.images[0]}
                            alt={product.name}
                            className='object-cover'
                          />
                          <AvatarFallback className='text-xs'>
                            {product.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className='font-medium max-w-[150px] truncate md:max-w-none'>
                          {product.name}
                        </h4>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-0.5 dark:text-orange-400'>
                        <p className='dirham-symbol'>&#xea;</p>
                        <p>{convertToNumber(product.price)}</p>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{convertToNumber(product.rating)}</TableCell>
                    <TableCell className='flex products-center'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'
                        aria-label={`product-${product.id}-edit`}
                        asChild
                      >
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <PencilIcon />
                        </Link>
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'
                        aria-label={`product-${product.id}-remove`}
                      >
                        <Trash2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {productsData.totalPages > 1 && (
            <PaginationControls
              currentPage={page}
              totalPages={productsData.totalPages}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default AdminProductsPage;
