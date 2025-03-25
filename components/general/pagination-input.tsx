import { type PaginationProps } from '@/features/general/types/app';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface PaginationInputProps {
  meta: PaginationProps;
  onPaginationChange: (page: number, perPage: number) => void;
}

export const PaginationInput = ({
  meta,
  onPaginationChange
}: PaginationInputProps) => {
  const currentPage = meta.page;

  const getCanPreviousPage = meta.page > 1;

  const getCanNextPage = meta.page < meta.totalPages;

  const handlePaginationChange = ({ page = 1, perPage = 10 }) => {
    onPaginationChange(page, perPage);
  };

  const handlePageChange = (page: number) => {
    if (page < 1) {
      page = 1;
    } else if (page > meta.totalPages) {
      page = meta.totalPages;
    }
    handlePaginationChange({ page, perPage: meta.perPage });
  };

  const showThirdPageButton =
    meta.totalPages > 2 && currentPage < meta.totalPages;

  const showButton2 = meta.totalPages === 2 && currentPage === 1;

  const showEllipsis =
    (currentPage < 3 && meta.totalPages > 3) ||
    currentPage < meta.totalPages - 3;

  return (
    <div className="align-center mt-5 flex justify-center">
      <Pagination>
        <PaginationContent>
          {getCanPreviousPage && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationLink
                href={`#${currentPage - 1}`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>
          {showButton2 && (
            <PaginationItem>
              <PaginationLink href={`#2`} onClick={() => handlePageChange(2)}>
                2
              </PaginationLink>
            </PaginationItem>
          )}
          {showThirdPageButton && (
            <PaginationItem>
              <PaginationLink
                href={`#${currentPage + 1}`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {showEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {getCanNextPage && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
