import { resData, resMessage, resType } from "../common/type";
import { News } from "../entities/News";
import { createNews } from "../types/news";

export const news_services = {
  getAll: async (): Promise<resData<News[]> | resMessage> => {
    try {
      const [data, count] = await News.findAndCount();
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
  create: async (body: createNews): Promise<resType<News> | resMessage> => {
    try {
      const data = await News.save({ ...body });
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
