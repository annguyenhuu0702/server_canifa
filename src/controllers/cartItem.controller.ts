import { Request, Response } from "express";
import { cartItem_services } from "../services/cartItem.services";

export const cartItem_controller = {
  create: async (req: Request, res: Response) => {
    const { data, status } = await cartItem_services.create(req.body);
    return res.status(status).json(data);
  },
};
