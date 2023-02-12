import { resData, resMessage, resType } from "../common/type";
import { AppDataSource } from "../db";
import { ProductVariant } from "../entities/ProductVariant";
import {
  createProductVariant,
  getAllProductVariant,
  updateProductVariant,
} from "../types/productVariant";

export const productVariant_services = {
  createMany: async (
    body: createProductVariant[]
  ): Promise<resType<ProductVariant[]> | resMessage> => {
    try {
      const data = await AppDataSource.getRepository(ProductVariant).save(body);
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
  update: async (
    id: string,
    body: updateProductVariant
  ): Promise<resMessage> => {
    await ProductVariant.update(
      {
        id: parseInt(id),
      },
      body
    );
    try {
      return {
        status: 200,
        data: {
          message: "Update successfully",
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
  delete: async (id: string): Promise<resMessage> => {
    try {
      await AppDataSource.getRepository(ProductVariant).softDelete({
        id: parseInt(id),
      });
      return {
        status: 200,
        data: {
          message: "Delete successfully",
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
  getAll: async (
    query: getAllProductVariant
  ): Promise<resData<ProductVariant[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const [productVariants, count] = await ProductVariant.findAndCount({
        withDeleted: false,
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        order: {
          createdAt: "DESC",
        },
      });
      return {
        status: 200,
        data: {
          data: {
            rows: productVariants,
            count,
          },
          message: "Success",
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
  getById: async (
    id: string
  ): Promise<resType<ProductVariant> | resMessage> => {
    try {
      const productVariant = await ProductVariant.findOne({
        where: {
          id: parseInt(id),
        },
      });
      if (!productVariant) {
        return {
          status: 404,
          data: {
            message: "Not found!",
          },
        };
      }
      return {
        status: 200,
        data: {
          data: productVariant,
          message: "Success",
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
