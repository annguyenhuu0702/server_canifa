import { queryItems } from "../common/type";
import { VariantValue } from "../entities/VariantValue";

export interface createProductVariant {
  productId: number;
  slug: string;
  inventory: number;
  variantValues: VariantValue[];
}

export interface updateProductVariant extends createProductVariant {}

export interface getAllProductVariant extends queryItems {}
