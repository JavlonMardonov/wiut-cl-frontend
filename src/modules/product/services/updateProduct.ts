import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { productsAPI } from "../api/productsAPI";
import { ProductsCacheKey } from "../constants/queryKey";
import { UpdateProductReq } from "../types/UpdateProductReq";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: UpdateProductReq }) =>
      productsAPI.update(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ProductsCacheKey],
      });
      toast.success("Product updated successfully");
    },
    onError: () => {
      toast.error("Product update failed");
    },
  });
};
