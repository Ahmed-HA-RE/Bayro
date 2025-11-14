import sampleData from '@/sample-data';
import ProductList from '../components/products/ProductList';
import { Product } from '@/types';

const sampleDataArr: Product[] = sampleData.products;
const HomePage = () => {
  return <ProductList products={sampleDataArr} limit={4} />;
};

export default HomePage;
