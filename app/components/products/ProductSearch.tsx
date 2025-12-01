'use client';

import { Input } from '../ui/input';
import { NativeSelect, NativeSelectOption } from '../ui/native-select';
import { useQueryState, throttle } from 'nuqs';
import { usePathname } from 'next/navigation';

type SearchProps = {
  categories: {
    category: string;
  }[];
};

const Search = ({ categories }: SearchProps) => {
  const [q, setQ] = useQueryState('q', {
    shallow: false,
    limitUrlUpdates: throttle(300),
  });
  const [category, setCategory] = useQueryState('category', {
    shallow: false,
    limitUrlUpdates: throttle(300),
  });
  const pathname = usePathname();

  return (
    pathname === '/products' && (
      <div className='flex flex-row items-center justify-center gap-2 flex-1/2 md:flex-1/3'>
        <div className='hidden md:block flex-1/6'>
          <NativeSelect
            value={category || ''}
            onChange={(e) => setCategory(e.target.value || null)}
            className='dark:border-white focus-visible:border-blue-500 focus-visible:ring-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-300'
          >
            <NativeSelectOption value=''>All</NativeSelectOption>
            {categories.map(({ category }) => (
              <NativeSelectOption key={category} value={category}>
                {category}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className='flex flex-row items-center justify-center gap-2 md:flex-1/2 w-full'>
          <Input
            className='h-9 focus-visible:border-blue-400 focus-visible:ring-blue-400 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500 dark:border-white dark:text-white dark:placeholder:text-gray-50/70'
            placeholder='Search...'
            type='search'
            value={q || ''}
            onChange={(e) => setQ(e.target.value || null)}
          />
        </div>
      </div>
    )
  );
};

export default Search;
