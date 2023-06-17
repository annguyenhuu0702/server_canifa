import { resData, resMessage, resType } from "../common/type";
import { Coupon } from "../entities/Coupon";
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
  // update: async (id: string, body: updateNews): Promise<resMessage> => {
  //   try {
  //     const item = await News.findOne({
  //       where: {
  //         id: parseInt(id),
  //       },
  //     });
  //     await News.update(
  //       {
  //         id: parseInt(id),
  //       },
  //       body
  //     );
  //     if (item) {
  //       if (item.thumbnail && item.thumbnail !== body.thumbnail) {
  //         await getCloudinary().v2.uploader.destroy(
  //           "canifa" + item.thumbnail.split("canifa")[1].split(".")[0]
  //         );
  //       }
  //     }
  //     await News.save({
  //       ...item,
  //       ...body,
  //     });
  //     return {
  //       status: 200,
  //       data: {
  //         message: "Update successfully",
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       status: 500,
  //       data: {
  //         message: "Error",
  //       },
  //     };
  //   }
  // },
  // delete: async (id: string): Promise<resMessage> => {
  //   try {
  //     const item = await AppDataSource.getRepository(News).findOneBy({
  //       id: parseInt(id),
  //     });
  //     if (item) {
  //       if (item.thumbnail && item.thumbnail !== "") {
  //         await getCloudinary().v2.uploader.destroy(
  //           "canifa" + item.thumbnail.split("canifa")[1].split(".")[0]
  //         );
  //       }
  //       await AppDataSource.getRepository(News).softDelete({
  //         id: item.id,
  //       });
  //     }

  //     return {
  //       status: 200,
  //       data: {
  //         message: "Delete successfully",
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       status: 500,
  //       data: {
  //         message: "Error",
  //       },
  //     };
  //   }
  // },
};
