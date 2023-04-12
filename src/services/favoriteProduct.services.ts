import { resData, resMessage, resType } from "../common/type";
import { FavoriteProduct } from "../entities/LoveProduct";
import {
  createFavoriteProduct,
  getAllFavoriteProduct,
} from "../types/favoriteProduct";

export const favoriteProduct_services = {
  getAll: async (
    query: getAllFavoriteProduct
  ): Promise<resData<FavoriteProduct[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const [data, count] = await FavoriteProduct.findAndCount({
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * parseInt(p) - 1 } : {}),
      });
      return {
        status: 200,
        data: {
          data: {
            rows: data,
            count: count,
          },
          message: "success",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: {
          message: "Error",
        },
      };
    }
  },
  create: async (
    body: createFavoriteProduct,
    userId: number
  ): Promise<resType<FavoriteProduct> | resMessage> => {
    try {
      const data = await FavoriteProduct.save({
        userId,
        productId: body.productId,
      });
      return {
        status: 201,
        data: {
          data: data,
          message: "Created success",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: {
          message: "Error",
        },
      };
    }
  },
  delete: async (
    productId: string,
    userId: number
  ): Promise<resType<any> | resMessage> => {
    try {
      await FavoriteProduct.delete({
        productId: parseInt(productId),
        userId,
      });
      return {
        status: 200,
        data: {
          data: "",
          message: "deleted success",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: {
          message: "Error",
        },
      };
    }
  },
  getByUser: async (
    query: getAllFavoriteProduct,
    userId: number
  ): Promise<resData<FavoriteProduct[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const [data, count] = await FavoriteProduct.findAndCount({
        where: {
          userId,
        },
        relations: {
          product: {
            productVariants: {
              variantValues: true,
            },
            productImages: true,
          },
        },
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * parseInt(p) - 1 } : {}),
      });
      return {
        status: 200,
        data: {
          data: {
            rows: data,
            count,
          },
          message: "success",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: {
          message: "Error",
        },
      };
    }
  },
};
