'use client';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/app/components/ui/dropdown-menu';
import { Search, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { parseAsString, throttle, useQueryState } from 'nuqs';
import { productsPriceRanges, PRODUCT_SORT_OPTIONS } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type ProductFilterProps = {
  categories: {
    category: string;
    count: number;
  }[];
};

const ProductFilter = ({ categories }: ProductFilterProps) => {
  const router = useRouter();

  const [price, setPrice] = useQueryState(
    'price',
    parseAsString.withDefault('').withOptions({
      limitUrlUpdates: throttle(200),
      shallow: false,
    })
  );

  const [category, setCategory] = useQueryState('category', {
    shallow: false,
    limitUrlUpdates: throttle(300),
  });

  const [sort, setSort] = useQueryState('sort', {
    shallow: false,
    limitUrlUpdates: throttle(300),
  });

  const [q, setQ] = useQueryState('q', {
    shallow: false,
    limitUrlUpdates: throttle(300),
  });

  const clearFilter = (type: string) => {
    if (type === 'price') {
      setPrice('');
    } else if (type === 'category') {
      setCategory(null);
    }
  };

  const clearAllFilters = () => {
    router.push('/products');
  };

  const activeFilters = [];
  if (category) activeFilters.push({ label: 'category', value: category });
  if (price) activeFilters.push({ label: 'price', value: `AED ${price}` });

  return (
    <>
      {/* Horizontal Filter Bar */}
      <div className='mb-6 space-y-4'>
        {/* Search and Sort Row */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          {/* Search */}
          <div className='relative md:max-w-md flex-1'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              className='h-9 focus-visible:border-blue-400 focus-visible:ring-blue-400 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500 dark:border-white dark:text-white dark:placeholder:text-gray-50/70 pl-10'
              placeholder='Search...'
              type='search'
              value={q || ''}
              onChange={(e) => setQ(e.target.value || null)}
            />
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='w-full cursor-pointer sm:w-auto dark:dark-border-color'
              >
                <SlidersHorizontal className='size-4' />
                Sort:{' '}
                {PRODUCT_SORT_OPTIONS.find((x) => x.value === sort)?.label ||
                  'Default'}
                <ChevronDown className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              {PRODUCT_SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSort(option.value)}
                  className='hover:bg-amber-400 hover:!text-white'
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Category and Price Filter Row */}
        <div className='flex flex-wrap gap-3'>
          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='dark:dark-border-color'
              >
                Category: {category === null ? 'All' : category}
                <ChevronDown className='ms-2 size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuItem
                className='cursor-pointer hover:bg-amber-400 hover:!text-white'
                onClick={() => setCategory(null)}
              >
                All
              </DropdownMenuItem>
              {categories.map((cat) => (
                <DropdownMenuItem
                  key={cat.category}
                  onClick={() => setCategory(cat.category)}
                  className='hover:bg-amber-400 hover:!text-white'
                >
                  <div className='flex w-full items-center justify-between'>
                    <span>{cat.category}</span>
                    <Badge variant='secondary' className='text-xs'>
                      {cat.count}
                    </Badge>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Range Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='cursor-pointer dark:dark-border-color'
              >
                Price:{' '}
                {!price
                  ? 'All'
                  : productsPriceRanges.find((p) => p.value === price)?.label}
                <ChevronDown className='ms-2 size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
              {productsPriceRanges.map((range) => (
                <DropdownMenuItem
                  key={range.id}
                  onClick={() => setPrice(range.value)}
                  className={'hover:bg-amber-400 hover:!text-white'}
                >
                  {range.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-muted-foreground text-sm font-medium'>
              Active filters:
            </span>
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant='secondary'>
                {filter.value}
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-auto cursor-pointer !p-1 text-inherit'
                  onClick={() => clearFilter(filter.label)}
                >
                  <X className='size-3' />
                </Button>
              </Badge>
            ))}
            <DropdownMenuSeparator className='mx-2' />
            <Button
              variant='ghost'
              size='sm'
              onClick={clearAllFilters}
              className='text-muted-foreground h-auto cursor-pointer p-1.5 text-xs'
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductFilter;
