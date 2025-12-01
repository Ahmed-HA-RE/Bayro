'use client';
import { useQueryState, throttle } from 'nuqs';

import { cn, PRODUCT_SORT_OPTIONS } from '@/lib/utils';

const ProductSort = ({ querySort }: { querySort: string }) => {
  const [sort, setSort] = useQueryState('sort', {
    shallow: false,
    limitUrlUpdates: throttle(300),
  });

  return (
    <div className='mb-4 flex flex-row items-center justify-end gap-2.5 pr-2'>
      <span className='text-lg font-medium'>Sort by:</span>
      <div className='space-x-4 flex flex-row items-center'>
        {PRODUCT_SORT_OPTIONS.map((option) => (
          <p
            key={option}
            onClick={() => setSort(option)}
            className={cn(
              'cursor-pointer',
              querySort === option && 'font-bold'
            )}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductSort;
