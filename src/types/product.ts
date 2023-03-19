import { queryItems } from "../common/type";

export interface createProduct {
  productCategoryId: number;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  price: number;
  priceSale: number;
}

export interface updateProduct extends createProduct {}

export interface getAllProduct extends queryItems {
  name?: string;
  slug?: string;
  otherSlug?: string;
}

export interface getByCategory {
  limitCollection?: string;
  limitProduct?: string;
}
