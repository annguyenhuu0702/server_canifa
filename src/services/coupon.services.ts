import { In, MoreThanOrEqual, Not } from "typeorm";
import { resData, resMessage, resType } from "../common/type";
import { Coupon } from "../entities/Coupon";
import { CouponUser } from "../entities/CouponUser";
import { createCoupon, getAllCoupon } from "../types/coupon";

export const coupon_services = {
  getAll: async (
    query: getAllCoupon
  ): Promise<resData<Coupon[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const [data, count] = await Coupon.findAndCount({
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
  create: async (body: createCoupon): Promise<resType<Coupon> | resMessage> => {
    try {
      const data = await Coupon.save({ ...body });
      // const newData = await User.find();
      // Promise.all(
      //   newData.map((item) => {
      //     return CouponUser.save({ couponId: data.id, userId: item.id });
      //   })
      // );

      // await User.update(
      //   {
      //     id: MoreThan(0),
      //   },
      //   {
      //     ...data,
      //   }
      // );

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

  getCouponByUser: async (
    user: any
  ): Promise<resData<Coupon[]> | resMessage> => {
    try {
      // const couponusers = await CouponUser.find({
      //   select: ["couponId"],
      //   where: {
      //     userId: user.id,
      //   },
      // });
      // console.log(couponusers);
      // if (couponusers) {
      //   couponusers.map((item) => item.couponId);
      // }
      const usedCouponIds = await CouponUser.find({
        select: ["couponId"],
        where: {
          userId: user.id,
        },
      }).then((couponUsers) => couponUsers.map((item) => item.couponId));
      const [data, count] = await Coupon.findAndCount({
        where: {
          id: Not(In(usedCouponIds)),

          endday: MoreThanOrEqual(new Date()),
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

  checkCoupon: async (data: any, body: any): Promise<any | resMessage> => {
    const { couponId } = body;
    try {
      const couponuser = await CouponUser.findOne({
        where: {
          userId: data.id,
        },
      });
      if (!couponuser) {
        const data = await Coupon.findOne({
          where: {
            id: couponId,
          },
        });
        if (data) {
          if (data.type === "freeship") {
            return {
              status: 200,
              data: {
                message: "freeship",
              },
            };
          }
          if (data.type === "discountorder") {
            return {
              status: 200,
              data: {
                data: {
                  percent: data.percent,
                },
                message: "success",
              },
            };
          }
        }
      }
      return {
        status: 204,
        data: {
          message: "Có vẻ như đang bị lỗi gì đó",
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
