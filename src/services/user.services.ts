import { resMessage, resType } from "../common/type";
import { User } from "../entities/User";
import { createUser } from "../types/user";
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
  update: async (id: string): Promise<resType<any> | resMessage> => {
    try {
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
};
