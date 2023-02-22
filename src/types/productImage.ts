import { queryItems } from "../common/type";

export interface createProductImage {
  productId: number;
  variantValueId: number;
  path: string;
}

export interface updateProductImage extends createProductImage {}

export interface getAllProductImage extends queryItems {
  productId: string;
}
