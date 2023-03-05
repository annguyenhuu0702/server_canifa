import { Response, Request } from "express";
import { resMessage, resType } from "../common/type";
import { User } from "../entities/User";
import {
  changeEmail,
  changePassword,
  changeProfile,
  login,
  register,
  typeAuth,
} from "../types/auth";
import * as argon from "argon2";
import jwt from "jsonwebtoken";

export const auth_services = {
  createAccessToken: (obj: any) => {
    const accessToken = jwt.sign(obj, process.env.AT || "super-serect", {
      expiresIn: "24h",
    });
    return accessToken;
  },
  createRefreshToken: (obj: any) => {
    const refreshToken = jwt.sign(obj, process.env.RF || "super-serect", {
      expiresIn: "48h",
    });
    return refreshToken;
  },
  register: async (
    body: register,
    res: Response
  ): Promise<resType<typeAuth> | resMessage> => {
    try {
      const isEmail = await User.findOneBy({
        email: body.email,
      });
      if (isEmail) {
        return {
          status: 403,
          data: {
            message: "Email already exits",
          },
        };
      }
      const hash = await argon.hash(body.password);
      const user = await User.save({
        email: body.email,
        hash,
        fullname: body.fullname,
      });
      const { hash: _hash, ...others } = user;
      const accessToken = auth_services.createAccessToken({
        id: user.id,
        role: user.role,
      });
      const refreshToken = auth_services.createRefreshToken({
        id: user.id,
        role: user.role,
      });
      res.cookie("REFRESH_TOKEN", refreshToken, {
        sameSite: "strict",
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return {
        status: 201,
        data: {
          data: {
            user: others,
            accessToken: accessToken,
          },
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
  login: async (
    body: login,
    res: Response
  ): Promise<resType<typeAuth> | resMessage> => {
    try {
      const isEmail = await User.findOneBy({
        email: body.email,
      });
      if (!isEmail) {
        return {
          status: 403,
          data: {
            message: "Email or password wrong!",
          },
        };
      }
      const isPassword = await argon.verify(isEmail.hash, body.password);
      if (!isPassword) {
        return {
          status: 403,
          data: {
            message: "Email or password wrong!",
          },
        };
      }
      const { hash: _hash, ...others } = isEmail;
      const accessToken = auth_services.createAccessToken({
        id: isEmail.id,
        role: isEmail.role,
      });
      const refreshToken = auth_services.createRefreshToken({
        id: isEmail.id,
        role: isEmail.role,
      });
      res.cookie("REFRESH_TOKEN", refreshToken, {
        sameSite: "strict",
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return {
        status: 200,
        data: {
          data: {
            user: others,
            accessToken: accessToken,
          },
          message: "Login success",
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
  refreshToken: async (
    req: Request
  ): Promise<resType<{ accessToken: string }> | resMessage> => {
    try {
      if (!req.cookies) {
        return {
          status: 401,
          data: {
            message: "Login now",
          },
        };
      }
      const refreshToken = req.cookies["REFRESH_TOKEN"];
      if (!refreshToken) {
        return {
          status: 401,
          data: {
            message: "Login now",
          },
        };
      }
      const decoded: any = jwt.verify(
        refreshToken,
        process.env.RF || "super-serect",
        {
          ignoreExpiration: true,
        }
      );
      const accessToken = auth_services.createAccessToken({
        id: decoded.id,
        role: decoded.role,
      });
      return {
        status: 201,
        data: {
          data: {
            accessToken,
          },
          message: "Success",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "Something is wrong" },
      };
    }
  },
  getProfile: async (data: any): Promise<resType<any> | resMessage> => {
    try {
      const user = await User.findOneBy({
        id: data.id,
      });
      if (!user) {
        return {
          status: 404,
          data: {
            message: "User not found",
          },
        };
      }
      const { hash: _hash, ...others } = user;
      return {
        status: 200,
        data: {
          data: others,
          message: "Success",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "Error" },
      };
    }
  },
  changeProfile: async (
    data: any,
    body: changeProfile
  ): Promise<resMessage> => {
    try {
      await User.update(
        {
          id: data.id,
        },
        body
      );
      return {
        status: 200,
        data: {
          message: "Change profile successfully",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "Error" },
      };
    }
  },
  changePassword: async (
    data: any,
    body: changePassword
  ): Promise<resMessage> => {
    try {
      const user = await User.findOneBy({
        id: data.id,
      });
      if (user) {
        const checkPassword = await argon.verify(
          user.hash,
          body.currentpassword
        );
        if (checkPassword) {
          const hash = await argon.hash(body.newpassword);
          await User.createQueryBuilder()
            .update()
            .set({
              hash,
            })
            .where("id = :id", { id: data.id })
            .execute();

          return {
            status: 200,
            data: {
              message: "Change password successfully",
            },
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
    return {
      status: 500,
      data: { message: "Error" },
    };
  },
  changeEmail: async (data: any, body: changeEmail): Promise<resMessage> => {
    try {
      await User.update(
        {
          id: data.id,
        },
        body
      );
      return {
        status: 200,
        data: {
          message: "Change email successfully",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "Error" },
      };
    }
  },
};
