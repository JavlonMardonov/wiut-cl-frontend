import { z } from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  price: z.number().min(0, "Price must be at least 0"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
