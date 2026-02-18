import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { productsAPI } from "../api/productsAPI";
import { ProductsCacheKey } from "../constants/queryKey";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ProductsCacheKey],
      });
      toast.success("Product deleted successfully");
    },
    onError: () => {
      toast.error("Product deletion failed");
    },
  });
};
