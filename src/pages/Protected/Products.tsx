import { FC } from "react";

import { ProductsTable } from "@/modules/product/ui/ProductsTable";

const Products: FC = () => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-display-xs font-semibold">Products</h1>
      </div>

      <ProductsTable />
    </div>
  );
};

export default Products;
