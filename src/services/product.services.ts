import { ILike } from "typeorm";
import { resData, resMessage, resType } from "../common/type";
import { getCloudinary } from "../config/configCloudinary";
import { AppDataSource } from "../db";
import { Product } from "../entities/Product";
import { createProduct, getAllProduct, updateProduct } from "../types/product";

export const product_services = {
  create: async (
    body: createProduct
  ): Promise<resType<Product> | resMessage> => {
    try {
      const product = await Product.save({ ...body });

      return {
        status: 201,
        data: {
          data: product,
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
  update: async (id: string, body: updateProduct): Promise<resMessage> => {
    const item = await Product.findOne({
      where: {
        id: parseInt(id),
      },
    });
    await Product.update(
      {
        id: parseInt(id),
      },
      body
    );

    await Product.save({
      ...item,
      ...body,
    });
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
      const item = await AppDataSource.getRepository(Product).findOneBy({
        id: parseInt(id),
      });
      if (item) {
        if (item.thumbnail && item.thumbnail !== "") {
          await getCloudinary().v2.uploader.destroy(
            "canifa" + item.thumbnail.split("canifa")[1].split(".")[0]
          );
        }
        await AppDataSource.getRepository(Product).softDelete({
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
    query: getAllProduct
  ): Promise<resData<Product[]> | resMessage> => {
    try {
      const { p, limit, name, slug, otherSlug } = query;
      const [data, count] = await Product.findAndCount({
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
          ...(otherSlug
            ? {
                productCategory: [
                  {
                    slug: otherSlug,
                  },
                  {
                    collection: {
                      slug: otherSlug,
                    },
                  },
                  {
                    collection: {
                      category: {
                        slug: otherSlug,
                      },
                    },
                  },
                ],
              }
            : {}),
        },
        withDeleted: false,
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        relations: {
          productCategory: true,
          productImages: true,
          productVariants: true,
        },
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
  getByCategory: async (slug: string): Promise<any> => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (id: string): Promise<resType<Product> | resMessage> => {
    try {
      const product = await Product.findOne({
        where: {
          id: parseInt(id),
        },
        relations: {
          productCategory: true,
          productImages: true,
          productVariants: true,
        },
      });
      if (!product) {
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
          data: product,
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
