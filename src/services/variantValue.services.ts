import { resData, resMessage, resType } from "../common/type";
import { VariantValue } from "../entities/VariantValue";
import {
  createVariantValue,
  getAllColor,
  getAllVariantValue,
} from "../types/variantValue";

export const variantValue_services = {
  create: async (
    body: createVariantValue
  ): Promise<resType<VariantValue> | resMessage> => {
    try {
      const data = await VariantValue.save({
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
  getAll: async (
    query: getAllVariantValue
  ): Promise<resData<VariantValue[]> | resMessage> => {
    try {
      const { p, limit, variantName } = query;
      const [variantValues, count] = await VariantValue.findAndCount({
        withDeleted: false,
        ...(limit ? { take: parseInt(limit) } : {}),
        ...(p && limit ? { skip: parseInt(limit) * (parseInt(p) - 1) } : {}),
        order: {
          variantId: "DESC",
          createdAt: "DESC",
        },
        ...(variantName ? { variant: { name: variantName } } : {}),
      });
      return {
        status: 200,
        data: {
          data: {
            rows: variantValues,
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
  getAllColor: async (
    query: getAllColor
  ): Promise<resData<VariantValue[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const [colors, count] = await VariantValue.findAndCount({
        where: {
          variantId: 2,
        },
        withDeleted: false,
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
            rows: colors,
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
  getAllSize: async (
    query: getAllColor
  ): Promise<resData<VariantValue[]> | resMessage> => {
    try {
      const { p, limit } = query;
      const [sizes, count] = await VariantValue.findAndCount({
        where: {
          variantId: 1,
        },
        withDeleted: false,
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
            rows: sizes,
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
};
