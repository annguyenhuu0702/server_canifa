import { resMessage, resType } from "../common/type";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { ProductVariant } from "../entities/ProductVariant";
import { createCartItem } from "../types/cartItem";

export const cartItem_services = {
  create: async (
    body: createCartItem,
    userId: number
  ): Promise<resType<any> | resMessage> => {
    try {
      let findCart = await Cart.findOne({
        where: {
          userId: userId,
        },
      });
      if (findCart) {
        const findProductVariant = await ProductVariant.findOne({
          where: {
            id: body.productVariantId,
          },
        });
        if (findProductVariant) {
          let checkCartItem = await CartItem.findOne({
            where: {
              cartId: findCart.id,
              productVariantId: findProductVariant.id,
            },
          });
          checkCartItem = await CartItem.save({
            ...checkCartItem,
            productVariantId: findProductVariant.id,
            cartId: findCart.id,
            quantity: checkCartItem
              ? checkCartItem.quantity + body.quantity
              : body.quantity,
          });
          return {
            status: 201,
            data: {
              data: checkCartItem,
              message: "Created success",
            },
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
    return {
      status: 500,
      data: {
        message: "Error",
      },
    };
  },
};
