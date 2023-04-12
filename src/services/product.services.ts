import { ILike, LessThan } from "typeorm";
import { makeid } from "../common";
import { resData, resMessage, resType } from "../common/type";
import { getCloudinary } from "../config/configCloudinary";
import { AppDataSource } from "../db";
import { Collection } from "../entities/Collection";
import { Discount } from "../entities/Discount";
import { Product } from "../entities/Product";
import { ProductCategory } from "../entities/ProductCategory";
import {
  createProduct,
  getAllProduct,
  getByCategory,
  updateProduct,
} from "../types/product";

export const product_services = {
  updatePriceSale: async (products: Product[]) => {
    const checkdiscount = await Discount.find({
      where: {
        endday: LessThan(new Date()),
      },
    });
    return Promise.all(
      products.map((product) =>
        Product.save({
          ...product,
          priceSale:
            checkdiscount.findIndex((discount) =>
              discount.productsId.includes(product.id)
            ) !== -1
              ? 0
              : product.priceSale,
        })
      )
    );
  },
  create: async (
    body: createProduct
  ): Promise<resType<Product> | resMessage> => {
    try {
      const product = await Product.save({ ...body, code: makeid(9) });
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
      const { p, limit, name, slug, otherSlug, sortBy, sortType } = query;
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
        order: { [sortBy || "createdAt"]: sortType || "DESC" },
      });
      return {
        status: 200,
        data: {
          data: {
            rows: await product_services.updatePriceSale(data),
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
  getById: async (id: string): Promise<resType<Product> | resMessage> => {
    try {
      const product = await Product.findOne({
        where: {
          id: parseInt(id),
        },
        relations: {
          productCategory: true,
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
          data: (await product_services.updatePriceSale([product]))[0],
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
              productVariants: {
                variantValues: true,
              },
            },
            ...(limitProduct ? { take: parseInt(limitProduct) } : {}),
          });
        })
      );
      const data: any = products.map((item) => {
        return {
          productCategory: item.length > 0 ? item[0].productCategory : null,
          products: item,
        };
      });

      for (let i = 0; i < data.length; i++) {
        let products = data[i].products;
        products = await product_services.updatePriceSale(products);
        data[i].products = products;
      }
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
  getBySlug: async (
    slug: string
  ): Promise<
    resType<{ product: Product; productsRelated: Product[] }> | resMessage
  > => {
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
      const productsRelated = await Product.find({
        where: {
          productCategoryId: product.productCategory.id,
        },
        take: 4,
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
      return {
        status: 200,
        data: {
          data: {
            product: (await product_services.updatePriceSale([product]))[0],
            productsRelated: await product_services.updatePriceSale(
              productsRelated
            ),
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
};
