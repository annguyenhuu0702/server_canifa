import { Request, Response } from "express";
import { coupon_services } from "../services/coupon.services";

export const coupon_controller = {
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await coupon_services.getAll(req.query);
    return res.status(status).json(data);
  },

  create: async (req: Request, res: Response) => {
    const { data, status } = await coupon_services.create(req.body);
    return res.status(status).json(data);
  },
};
