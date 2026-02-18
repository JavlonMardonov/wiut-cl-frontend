import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import * as React from "react";

import { IconButton, IconButtonProps } from "@/components/Button";
import { cn } from "@/lib/utils";

interface PaginationProps extends React.ComponentProps<"nav"> {}
const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

interface PaginationContentProps extends React.ComponentProps<"ul"> {}
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

interface PaginationItemProps extends React.ComponentProps<"li"> {}
const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<IconButtonProps, "size"> &
  React.ComponentProps<"a">;
const PaginationLink = ({
  className,
  isActive,
  disabled,
  children,
  ...props
}: PaginationLinkProps) => (
  <IconButton
    variant={isActive ? "outline" : "ghost"}
    size="sm"
    disabled={disabled}
    asChild
  >
    <a aria-current={isActive ? "page" : undefined} {...props}>
      {children}
    </a>
  </IconButton>
);
PaginationLink.displayName = "PaginationLink";

interface PaginationPreviousProps
  extends React.ComponentProps<typeof PaginationLink> {}
const PaginationPrevious = ({
  className,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ArrowLeftIcon className="h-4 w-4" />
    <span className="sr-only">Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

interface PaginationNextProps
  extends React.ComponentProps<typeof PaginationLink> {}
const PaginationNext = ({ className, ...props }: PaginationNextProps) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <ArrowRightIcon className="h-4 w-4" />
    <span className="sr-only">Next</span>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

interface PaginationEllipsisProps extends React.ComponentProps<"span"> {}
const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
