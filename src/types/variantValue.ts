import { queryItems } from "../common/type";

export interface createVariantValue {
  name: string;
  variantId: number;
}

export interface updateVariantValue extends createVariantValue {}

export interface getAllVariantValue extends queryItems {}
