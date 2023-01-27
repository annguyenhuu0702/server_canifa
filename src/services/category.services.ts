import { ILike } from "typeorm";
import { resData, resMessage, resType } from "../common/type";
import { AppDataSource } from "../db";
import { Category } from "../entities/Category";
import {
  createCategory,
  getAllCategory,
  updateCategory,
} from "../types/category";

export const category_services = {
  create: async (
    body: createCategory
  ): Promise<resType<Category> | resMessage> => {
    try {
      const category = await Category.save({ ...body });
      return {
        status: 201,
        data: {
          data: category,
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
  update: async (id: string, body: updateCategory): Promise<resMessage> => {
    try {
      await Category.update(
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
      await AppDataSource.getRepository(Category).softDelete({
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
    query: getAllCategory
  ): Promise<resData<Category[]> | resMessage> => {
    try {
      const { p, limit, name } = query;
      const categories = await Category.find({
        where: {
          ...(name
            ? {
                name: ILike(`%${name}%`),
              }
            : {}),
        },
        // relations: {
        //   collections: {
        //     productCategories: true,
        //   },
        // },
        withDeleted: false,
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        order: {
          createdAt: "DESC",
          collections: {
            createdAt: "DESC",
            productCategories: {
              createdAt: "DESC",
            },
          },
        },
      });
      const count = await Category.count({
        withDeleted: false,
      });
      return {
        status: 200,
        data: {
          data: {
            rows: categories,
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
  getById: async (id: string): Promise<resType<Category> | resMessage> => {
    try {
      const category = await Category.findOneBy({
        id: parseInt(id),
      });
      if (!category) {
        return {
          status: 404,
          data: {
            message: "Category not found!",
          },
        };
      }
      return {
        status: 200,
        data: {
          data: category,
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
