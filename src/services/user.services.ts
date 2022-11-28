import { queryItems, resData, resMessage, resType } from "../common/type";
import { User } from "../entities/User";
import { createUser, updateUser } from "../types/user";
import * as argon from "argon2";

export const user_services = {
  create: async (body: createUser): Promise<resType<any> | resMessage> => {
    try {
      const { email, password, ...others } = body;
      const isEmail = await User.findOneBy({
        email,
      });
      if (isEmail) {
        return {
          status: 403,
          data: {
            message: "Email already is exists",
          },
        };
      }
      const hash = await argon.hash(password);
      const data = await User.save({
        email,
        hash,
        ...others,
      });
      const { hash: _hash, ...other } = data;
      return {
        status: 201,
        data: { data: other, message: "Created success" },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "Error" },
      };
    }
  },
  update: async (id: string, body: updateUser): Promise<resMessage> => {
    try {
      const user = await User.findOneBy({
        id: parseInt(id),
      });
      if (!user) {
        return {
          status: 404,
          data: {
            message: "User not found!!!!",
          },
        };
      }
      await User.update(
        {
          id: parseInt(id),
        },
        body
      );
      return {
        status: 201,
        data: {
          message: "update successfully",
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
      const user = await User.findOneBy({
        id: parseInt(id),
      });
      if (!user) {
        return {
          status: 404,
          data: {
            message: "User not found!!!!",
          },
        };
      }
      await User.delete({
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
  getById: async (id: string): Promise<resType<any> | resMessage> => {
    try {
      const user = await User.findOne({
        where: {
          id: parseInt(id),
        },
        select: {
          avatar: true,
          birthday: true,
          city: true,
          createdAt: true,
          district: true,
          email: true,
          fullname: true,
          gender: true,
          id: true,
          updatedAt: true,
          phone: true,
          role: true,
          street: true,
          ward: true,
        },
      });
      if (!user) {
        return {
          status: 404,
          data: {
            message: "User not found!!!!",
          },
        };
      }
      return {
        status: 200,
        data: {
          data: user,
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
  getAll: async (query: queryItems): Promise<resData<any> | resMessage> => {
    try {
      const { p, limit } = query;
      const users = await User.find({
        where: {
          role: "user",
        },
        skip: p,
        take: limit,
      });

      const data = users.map((item) => {
        const { hash, ...others } = item;
        return others;
      });
      const count = await User.countBy({
        role: "user",
      });
      return {
        status: 200,
        data: {
          data: {
            rows: data,
            count: count,
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
