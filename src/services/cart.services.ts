import { resMessage, resType } from "../common/type";
import { Cart } from "../entities/Cart";
import { createCart } from "../types/cart";

export const cart_services = {
  getAll: async (): Promise<resType<Cart[]> | resMessage> => {
    try {
      const data = await Cart.find();
      return {
        status: 200,
        data: {
          data: data,
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
  create: async (body: createCart): Promise<resType<Cart> | resMessage> => {
    try {
      const data = await Cart.save({
        ...body,
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
  getByUser: async (id: number): Promise<resType<Cart> | resMessage> => {
    try {
      const data = await Cart.findOne({
        where: {
          userId: id,
        },
        relations: {
          cartItems: {
            productVariant: {
              variantValues: true,
              product: {
                productImages: true,
              },
            },
          },
        },
      });
      return {
        status: 200,
        data: {
          data: data,
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
