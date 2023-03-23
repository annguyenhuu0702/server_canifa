import { Request, Response } from "express";
import { cart_services } from "../services/cart.services";

export const cart_controller = {
  create: async (req: Request, res: Response) => {
    const { data, status } = await cart_services.create(req.body);
    return res.status(status).json(data);
  },
};
