import { PaginationRes } from "./PaginationRes";

export interface ListRes<T> {
  data: T[];
  pagination: PaginationRes;
}
