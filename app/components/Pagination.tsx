'use client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationControls = ({ currentPage, totalPages }: PaginationProps) => {
  return (
    <Pagination className='mt-4'>
      <PaginationContent className='w-full justify-between'>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage < 1 ? currentPage : currentPage - 1}`}
            className='border border-black dark:dark-border-color dark:hover:bg-gray-800 hover:bg-black hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-30'
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage > totalPages ? currentPage : currentPage + 1}`}
            className='border border-black dark:dark-border-color dark:hover:bg-gray-800  hover:bg-black hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-30'
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationControls;
