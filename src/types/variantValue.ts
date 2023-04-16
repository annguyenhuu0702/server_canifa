import { queryItems } from "../common/type";

export interface createVariantValue {
  name: string;
  variantId: number;
}

export interface updateVariantValue extends createVariantValue {}

export interface getAllVariantValue extends queryItems {
  variantName: string;
}

export interface getAllColor extends queryItems {}

export interface getAllSize extends queryItems {}
