import { resData, resMessage, resType } from "../common/type";
import { AppDataSource } from "../db";
import { Collection } from "../entities/Collection";
import {
  createCollection,
  getAllCollection,
  updateCollection,
} from "../types/collection";

export const colletion_services = {
  create: async (
    body: createCollection
  ): Promise<resType<Collection> | resMessage> => {
    try {
      const collection = await Collection.save({ ...body });
      return {
        status: 201,
        data: {
          data: collection,
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
  update: async (id: string, body: updateCollection): Promise<resMessage> => {
    try {
      await Collection.update(
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
      await AppDataSource.getRepository(Collection).softDelete({
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
    query: getAllCollection
  ): Promise<resData<Collection[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const collections = await Collection.find({
        relations: {
          category: true,
        },
        withDeleted: false,
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        order: {
          createdAt: "DESC",
        },
      });
      const count = await Collection.count({
        withDeleted: false,
      });
      return {
        status: 200,
        data: {
          data: {
            rows: collections,
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
  getById: async (id: string): Promise<resType<Collection> | resMessage> => {
    try {
      const collection = await Collection.findOne({
        where: {
          id: parseInt(id),
        },
        relations: {
          category: true,
        },
      });
      if (!collection) {
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
          data: collection,
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
