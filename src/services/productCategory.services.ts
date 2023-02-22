import { ILike } from "typeorm";
import { resData, resMessage, resType } from "../common/type";
import { AppDataSource } from "../db";
import { ProductCategory } from "../entities/ProductCategory";
import {
  createProductCategory,
  getAllProductCategory,
  updateProductCategory,
} from "../types/productCategory";

export const productCategory_services = {
  create: async (
    body: createProductCategory
  ): Promise<resType<ProductCategory> | resMessage> => {
    try {
      const data = await ProductCategory.save({ ...body });
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
    body: updateProductCategory
  ): Promise<resMessage> => {
    try {
      await ProductCategory.update(
        {
          id: parseInt(id),
        },
        body
      );
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
      await AppDataSource.getRepository(ProductCategory).softDelete({
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
    query: getAllProductCategory
  ): Promise<resData<ProductCategory[]> | resMessage> => {
    try {
      const { p, limit, name } = query;
      const data = await ProductCategory.find({
        where: {
          ...(name
            ? {
                name: ILike(`%${name}%`),
              }
            : {}),
        },
        relations: {
          collection: true,
        },
        withDeleted: false,
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        order: {
          createdAt: "DESC",
        },
      });
      const count = await ProductCategory.count({
        withDeleted: false,
      });
      return {
        status: 200,
        data: {
          data: {
            rows: data,
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
  ): Promise<resType<ProductCategory> | resMessage> => {
    try {
      const data = await ProductCategory.findOneBy({
        id: parseInt(id),
      });
      if (!data) {
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
          data: data,
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
