import { resMessage, resType } from "../common/type";
import { CartItem } from "../entities/CartItem";
import { createCartItem } from "../types/cartItem";

export const cartItem_services = {
  create: async (body: createCartItem): Promise<resType<any> | resMessage> => {
    try {
      // const check = await
      return {
        status: 201,
        data: {
          data: "",
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
