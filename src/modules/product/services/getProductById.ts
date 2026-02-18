import { useQuery } from "@tanstack/react-query";

import { productsAPI } from "../api/productsAPI";
import { ProductsCacheKey } from "../constants/queryKey";

export const getProductById = (id: string) => {
  return useQuery({
    queryKey: [ProductsCacheKey, id],
    queryFn: () => productsAPI.getOne(id),
  });
};
