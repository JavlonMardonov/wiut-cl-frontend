/* eslint-disable prefer-promise-reject-errors */
import { paginationDefaultValues } from "@/modules/base/constants/paginationDefaultValues";
import { ItemRes } from "@/modules/base/types/ItemRes";
import { ListRes } from "@/modules/base/types/ListRes";

import { products } from "../mock/products";
import { CreateProductReq } from "../types/CreateProductReq";
import { GetProductsParams } from "../types/GetProductsParams";
import { Product } from "../types/Product";
import { UpdateProductReq } from "../types/UpdateProductReq";

export const productsAPI = {
  getAll: ({
    _page,
    _limit,
    title,
    category,
  }: GetProductsParams = paginationDefaultValues): Promise<ListRes<Product>> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const returningProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(title?.toLowerCase() ?? "") &&
            product.category
              .toLowerCase()
              .includes(category?.toLowerCase() ?? ""),
        );
        resolve({
          data: returningProducts.slice((_page - 1) * _limit, _page * _limit),
          pagination: {
            total: returningProducts.length,
            page: _page,
            limit: _limit,
            pages: Math.ceil(returningProducts.length / _limit),
          },
        });
      }, 1000);
    }),
  getOne: (id: string): Promise<ItemRes<Product>> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const product = products.find((item) => item.id === id);
        if (!product) {
          throw new Error("Product not found");
        }
        resolve({ data: product });
      }, 1000);
    }),
  create: (product: CreateProductReq): Promise<ItemRes<Product>> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const newProduct = {
          id: `${products.length + 1}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...product,
        };
        products.push(newProduct);

        if (newProduct.name === "Hello world") {
          reject({
            code: 400,
            message: "Product not found",
          });
        }

        resolve({ data: newProduct });
      }, 1000);
    }),
  update: (id: string, product: UpdateProductReq): Promise<ItemRes<Product>> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex((item) => item.id === id);
        if (productIndex === -1) {
          reject({
            code: 404,
            message: "Product not found",
          });
        }
        const updatedProduct = {
          ...products[productIndex],
          ...product,
          updatedAt: new Date().toISOString(),
        };
        products[productIndex] = updatedProduct;

        if (updatedProduct.name === "Hello world") {
          reject({
            code: 400,
            message: "Product not found",
          });
        }
        resolve({ data: updatedProduct });
      }, 1000);
    }),
  delete: (id: string): Promise<ItemRes<string>> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex((item) => item.id === id);
        if (productIndex === -1) {
          reject({
            code: 404,
            message: "Product not found",
          });
        }
        products.splice(productIndex, 1);

        if (id === "1") {
          reject({
            code: 404,
            message: "Product not found",
          });
        }
        resolve({ data: id });
      }, 1000);
    }),
};
