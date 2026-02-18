import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { productsAPI } from "../api/productsAPI";
import { ProductsCacheKey } from "../constants/queryKey";
import { CreateProductReq } from "../types/CreateProductReq";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductReq) => productsAPI.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ProductsCacheKey],
      });
      toast.success("Product created successfully");
    },
    onError: () => {
      console.log("error");
      toast.error("Product creation failed");
    },
  });
};
