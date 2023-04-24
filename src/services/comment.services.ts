import { resData, resMessage, resType } from "../common/type";
import { AppDataSource } from "../db";
import { Comment } from "../entities/Comment";
import { createComment, updateComment } from "../types/comment";

export const comment_services = {
  getAll: async (): Promise<resData<Comment[]> | resMessage> => {
    try {
      const [data, count] = await Comment.findAndCount();
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
  create: async (
    body: createComment,
    userId: number
  ): Promise<resType<Comment> | resMessage> => {
    try {
      const data = await Comment.save({
        userId,
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
  update: async (id: string, body: updateComment): Promise<resMessage> => {
    try {
      await Comment.update(
        {
          id: parseInt(id),
        },
        body
      );
      return {
        status: 201,
        data: {
          message: "Update success",
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
      await AppDataSource.getRepository(Comment).softDelete({
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
};
