import { resData, resMessage, resType } from "../common/type";
import { getCloudinary } from "../config/configCloudinary";
import { AppDataSource } from "../db";
import { ProductImage } from "../entities/ProductImage";
import { createProductImage, getAllProductImage } from "../types/productImage";

export const productImage_services = {
  createMany: async (
    body: createProductImage[]
  ): Promise<resType<ProductImage[]> | resMessage> => {
    try {
      const data = await AppDataSource.getRepository(ProductImage).save(body);
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
  update: async (id: string, body: ProductImage): Promise<resMessage> => {
    await ProductImage.update(
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
      const item = await AppDataSource.getRepository(ProductImage).findOneBy({
        id: parseInt(id),
      });
      if (item) {
        await getCloudinary().v2.uploader.destroy(
          "canifa" + item.path.split("canifa")[1].split(".")[0]
        );
        await AppDataSource.getRepository(ProductImage).delete({ id: item.id });
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
    query: getAllProductImage
  ): Promise<resData<ProductImage[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const [productVariants, count] = await ProductImage.findAndCount({
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
  getById: async (id: string): Promise<resType<ProductImage> | resMessage> => {
    try {
      const data = await ProductImage.findOne({
        where: {
          id: parseInt(id),
        },
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
