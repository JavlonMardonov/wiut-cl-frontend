import { useQuery } from "@tanstack/react-query";

import { paginationDefaultValues } from "@/modules/base/constants/paginationDefaultValues";

import { productsAPI } from "../api/productsAPI";
import { ProductsCacheKey } from "../constants/queryKey";
import { GetProductsParams } from "../types/GetProductsParams";

export const useGetProducts = (
  params: GetProductsParams = paginationDefaultValues,
) => {
  return useQuery({
    queryKey: [ProductsCacheKey, params],
    queryFn: () => productsAPI.getAll(params),
  });
};
