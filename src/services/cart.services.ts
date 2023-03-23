import { resMessage, resType } from "../common/type";
import { Cart } from "../entities/Cart";
import { createCart } from "../types/cart";

export const cart_services = {
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
};
