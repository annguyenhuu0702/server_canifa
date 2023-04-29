import { resMessage, resType } from "../common/type";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { Payment } from "../entities/Payment";
import { User } from "../entities/User";
import { createPayment } from "../types/payemnt";

export const payment_services = {
  create: async (
    body: createPayment,
    userId: number
  ): Promise<resType<Payment> | resMessage> => {
    try {
      const cart = await Cart.findOne({
        where: {
          userId,
        },
      });

      if (cart) {
        const cartItem = await CartItem.find({
          where: {
            cartId: cart.id,
          },
          relations: {
            productVariant: {
              product: true,
            },
          },
        });
        const payemnt = await Payment.create({
          ...body,
          userId,
        });

        const data = await Payment.save({
          ...payemnt,
          paymentItems: cartItem.map((item) => ({
            productVariantId: item.productVariantId,
            price:
              item.productVariant.product.priceSale ||
              item.productVariant.product.price,
            paymentId: payemnt.id,
            quantity: item.quantity,
          })),
        });

        await CartItem.delete({
          cartId: cart.id,
        });

        const checkUser = await User.findOne({
          where: {
            id: userId,
          },
        });

        if (checkUser) {
          await User.update(
            {
              id: checkUser.id,
            },
            {
              accumulatedPoints: checkUser.accumulatedPoints - body.point,
            }
          );
        }

        return {
          status: 201,
          data: {
            data: data,
            message: "Created success",
          },
        };
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
