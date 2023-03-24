import { limits } from "argon2";
import { queryItems } from "../common/type";

type createFavoriteProduct = {
  productId: number;
};

type getAllFavoriteProduct = queryItems & {};

export type { createFavoriteProduct, getAllFavoriteProduct };
