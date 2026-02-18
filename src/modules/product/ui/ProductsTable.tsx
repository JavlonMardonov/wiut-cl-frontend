import { ColumnDef } from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import { format } from "date-fns";
import { EditIcon, RotateCwIcon, SearchIcon, TrashIcon } from "lucide-react";
import { FC, useState } from "react";

import { Input } from "@/components/_form/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_form/Select";
import { Badge } from "@/components/Badge";
import { Button, IconButton } from "@/components/Button";
import { DataTable } from "@/components/Table";

import { useGetProducts } from "../services/getProducts";
import { Product } from "../types/Product";

import { CreateProduct } from "./CreateProduct";
import { DeleteProduct } from "./DeleteProduct";
import { UpdateProduct } from "./UpdateProduct";

const columns = ({
  onUpdate,
  onDelete,
}: {
  onUpdate: (product: Product) => void;
  onDelete: (product: Product) => void;
}): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <Badge>{row.original.price}</Badge>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy"),
  },
  {
    id: "actions",
    header: () => <div className="w-full text-center">Amallar</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <IconButton
          size="sm"
          variant="outline"
          onClick={() => onUpdate(row.original)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="sm"
          variant="error-outline"
          onClick={() => onDelete(row.original)}
        >
          <TrashIcon />
        </IconButton>
      </div>
    ),
  },
];

export const ProductsTable: FC = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const [category, setCategory] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const { data, isFetching } = useGetProducts({
    _page: pagination.pageIndex + 1,
    _limit: pagination.pageSize,
    title: debouncedSearch,
    category,
  });

  const handleReset = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <>
      <DataTable
        title="Products"
        description="List of all products"
        extra={
          <div className="flex items-center gap-2">
            <Input
              iconLeft={<SearchIcon size={20} />}
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SelectItem key={index} value={`Category ${index + 1}`}>
                    Category {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <IconButton variant="error-outline" onClick={handleReset}>
              <RotateCwIcon />
            </IconButton>
            <Button onClick={() => setOpen(true)}>Create Product</Button>
          </div>
        }
        columns={columns({
          onUpdate: (product) => setUpdatingProduct(product),
          onDelete: (product) => setDeletingProduct(product),
        })}
        isLoading={isFetching}
        data={data?.data || []}
        pagination={{
          pagination,
          onPaginationChange: setPagination,
          rowCount: data?.pagination.total || 0,
        }}
      />

      <CreateProduct open={open} setOpen={setOpen} />
      <UpdateProduct
        open={updatingProduct !== null}
        onClose={() => setUpdatingProduct(null)}
        id={updatingProduct?.id}
        product={updatingProduct}
      />
      <DeleteProduct
        open={deletingProduct !== null}
        onClose={() => setDeletingProduct(null)}
        id={deletingProduct?.id}
      />
    </>
  );
};
