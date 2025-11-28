import ProductForm from '@/app/components/admin/ProductForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Product',
  description: 'Admin panel to create a new product.',
};

const AdminCreateProductPage = () => {
  return (
    <section className='mt-4'>
      <h1 className='font-bold text-3xl mb-6'>Create Product</h1>
      <ProductForm type={'create'} />
    </section>
  );
};

export default AdminCreateProductPage;
