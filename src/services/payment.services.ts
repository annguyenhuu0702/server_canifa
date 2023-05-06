import { ILike } from "typeorm";
import { queryItems, resData, resMessage, resType } from "../common/type";
import { AppDataSource } from "../db";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { Payment } from "../entities/Payment";
import { PaymentItem } from "../entities/PaymentItem";
import { ProductVariant } from "../entities/ProductVariant";
import { User } from "../entities/User";
import { createPayment, getAllPayment, updatePayment } from "../types/payemnt";

export const payment_services = {
  getAll: async (
    query: getAllPayment
  ): Promise<resData<Payment[]> | resMessage> => {
    try {
      const { p, limit, phone, fullname } = query;
      const [data, count] = await Payment.findAndCount({
        where: {
          ...(fullname
            ? {
                fullname: ILike(`%${fullname}%`),
              }
            : {}),
          ...(phone
            ? {
                phone: ILike(`%${phone}%`),
              }
            : {}),
        },
        relations: {
          paymentItems: true,
        },
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
            rows: data,
            count,
          },
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
  getByUser: async (
    userId: number,
    query: getAllPayment
  ): Promise<resData<Payment[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const [data, count] = await Payment.findAndCount({
        where: {
          userId,
        },
        relations: {
          paymentItems: true,
        },
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        order: {
          createdAt: "DESC",
        },
      });
      if (!data) {
        return {
          status: 404,
          data: {
            message: "Not found",
          },
        };
      }
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
  getById: async (id: string): Promise<resType<Payment> | resMessage> => {
    try {
      const data = await Payment.findOne({
        where: {
          id: parseInt(id),
        },
      });
      if (!data) {
        return {
          status: 404,
          data: {
            message: "Not found",
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
  create: async (body: createPayment, userId: number): Promise<any> => {
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
        });

        const paymentItems = await AppDataSource.getRepository(
          PaymentItem
        ).save(
          cartItem.map((item) => ({
            productVariantId: item.productVariantId,
            price:
              item.productVariant.product.priceSale ||
              item.productVariant.product.price,
            paymentId: data.id,
            quantity: item.quantity,
          }))
        );

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
            data,
            paymentItems,
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
  update: async (id: string, body: updatePayment): Promise<resMessage> => {
    try {
      await Payment.update(
        {
          id: parseInt(id),
        },
        body
      );

      const paymentItems = await PaymentItem.find({
        where: {
          paymentId: parseInt(id),
        },
        relations: {
          productVariant: true,
        },
      });

      if (body.status === "Đã giao hàng") {
        await AppDataSource.getRepository(ProductVariant).save(
          paymentItems.map((item) => ({
            ...item.productVariant,
            inventory: item.productVariant.inventory - item.quantity,
          }))
        );

        const payemnt = await Payment.findOne({
          where: {
            id: parseInt(id),
          },
        });

        if (payemnt) {
          const checkUser = await User.findOne({
            where: {
              id: payemnt.userId,
            },
          });
          if (checkUser) {
            const data = await AppDataSource.getRepository(User).update(
              {
                id: checkUser.id,
              },
              {
                accumulatedPoints:
                  checkUser.accumulatedPoints + body.totalPrice / 1000,
              }
            );
          }
        }
      }
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
      await AppDataSource.getRepository(Payment).softDelete({
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

  checkPoint: async (point: number, userId: number): Promise<resMessage> => {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (user) {
        if (point > user?.accumulatedPoints) {
          return {
            status: 400,
            data: {
              message: "Điểm tích lũy của bạn không đủ!",
            },
          };
        }
      }
      if (user) {
        if (point <= user?.accumulatedPoints) {
          return {
            status: 200,
            data: {
              message: "Success",
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
