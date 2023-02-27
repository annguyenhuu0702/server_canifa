import { ILike } from "typeorm";
import { resData, resMessage, resType } from "../common/type";
import { getCloudinary } from "../config/configCloudinary";
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
      const item = await ProductCategory.findOne({
        where: {
          id: parseInt(id),
        },
      });
      await ProductCategory.update(
        {
          id: parseInt(id),
        },
        body
      );
      if (item) {
        if (item.thumbnail && item.thumbnail !== body.thumbnail) {
          await getCloudinary().v2.uploader.destroy(
            "canifa" + item.thumbnail.split("canifa")[1].split(".")[0]
          );
        }
      }
      await ProductCategory.save({
        ...item,
        ...body,
      });
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
      const item = await AppDataSource.getRepository(ProductCategory).findOneBy(
        {
          id: parseInt(id),
        }
      );
      if (item) {
        await getCloudinary().v2.uploader.destroy(
          "canifa" + item.thumbnail.split("canifa")[1].split(".")[0]
        );
        await AppDataSource.getRepository(ProductCategory).softDelete({
          id: item.id,
        });
      }
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
      const { p, limit, name, slug } = query;
      const [data, count] = await ProductCategory.findAndCount({
        where: {
          ...(name
            ? {
                name: ILike(`%${name}%`),
              }
            : {}),
          ...(slug
            ? {
                slug,
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
