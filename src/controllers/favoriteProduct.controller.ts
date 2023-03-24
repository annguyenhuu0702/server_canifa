import { Request, Response } from "express";
import { cart_services } from "../services/cart.services";
import { favoriteProduct_services } from "../services/favoriteProduct.services";

export const favoriteProduct_controller = {
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await favoriteProduct_services.getAll(req.query);
    return res.status(status).json(data);
  },
  create: async (req: Request, res: Response) => {
    const { data, status } = await favoriteProduct_services.create(
      req.body,
      res.locals.user.id
    );
    return res.status(status).json(data);
  },
  getByUser: async (req: Request, res: Response) => {
    const { data, status } = await favoriteProduct_services.getByUser(
      res.locals.user.id
    );
    return res.status(status).json(data);
  },
};
