import { ILike } from "typeorm";
import { resData, resMessage, resType } from "../common/type";
import { getCloudinary } from "../config/configCloudinary";
import { AppDataSource } from "../db";
import { Collection } from "../entities/Collection";
import { Product } from "../entities/Product";
import { ProductCategory } from "../entities/ProductCategory";
import {
  createProduct,
  getAllProduct,
  getByCategory,
  updateProduct,
} from "../types/product";

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
          productVariants: {
            variantValues: true,
          },
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
  getByCategory: async (
    query: getByCategory,
    slug: string
  ): Promise<resData<any> | resMessage> => {
    const { limitCollection, limitProduct } = query;
    try {
      const collections = await Collection.find({
        where: {
          category: {
            slug,
          },
        },
        ...(limitCollection ? { take: parseInt(limitCollection) } : {}),
        relations: {
          category: true,
        },
      });

      const productsCategory = await Promise.all(
        collections.map((item) => {
          return ProductCategory.findOne({
            where: {
              collectionId: item.id,
            },
          });
        })
      );

      const products = await Promise.all(
        productsCategory.map((item) => {
          return Product.find({
            where: {
              productCategoryId: item ? item.id : 0,
            },
            relations: {
              productCategory: true,
              productImages: true,
            },
            ...(limitProduct ? { take: parseInt(limitProduct) } : {}),
          });
        })
      );
      const data = products.map((item) => {
        return {
          productCategory: item.length > 0 ? item[0].productCategory : null,
          products: item,
        };
      });
      const count = data.length;
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
  getBySlug: async (slug: string): Promise<resType<Product> | resMessage> => {
    try {
      const product = await Product.findOne({
        where: {
          slug,
        },
        relations: {
          productCategory: {
            collection: {
              category: true,
            },
          },
          productImages: true,
          productVariants: {
            variantValues: true,
          },
        },
      });
      if (!product) {
        return {
          status: 404,
          data: {
            message: "Product not found!",
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
