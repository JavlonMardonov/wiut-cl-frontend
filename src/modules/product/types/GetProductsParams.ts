import { PaginationReq } from "@/modules/base/types/PaginationReq";

export interface GetProductsParams extends PaginationReq {
  title?: string;
  category?: string;
}
