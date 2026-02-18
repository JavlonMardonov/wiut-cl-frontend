import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination.style";

interface IProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onChange?: (newPage: number) => void;
  constructPageLink?: (newPage: number) => string;
}

export const Pagination = ({
  className,
  currentPage,
  totalPages,
  onChange = () => {},
  constructPageLink,
}: IProps) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const isTotalPageValid = nextPage && nextPage < totalPages;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevPage}
            disabled={prevPage < 1}
          />
        </PaginationItem>
        {prevPage > 1 && (
          <>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationLink
                href={constructPageLink?.(1)}
                onClick={() => onChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {prevPage > 0 && (
          <PaginationItem className="cursor-pointer select-none">
            <PaginationLink
              href={constructPageLink?.(prevPage)}
              onClick={handlePrevPage}
            >
              {prevPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer select-none">
          <PaginationLink href={constructPageLink?.(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {nextPage <= totalPages && (
          <PaginationItem className="cursor-pointer select-none">
            <PaginationLink
              href={constructPageLink?.(nextPage)}
              onClick={handleNextPage}
            >
              {nextPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {isTotalPageValid && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationLink
                href={constructPageLink?.(totalPages)}
                onClick={() => onChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            disabled={nextPage > totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
