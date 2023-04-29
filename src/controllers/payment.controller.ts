import { Request, Response } from "express";
import { payment_services } from "../services/payment.services";

export const payment_controller = {
  create: async (req: Request, res: Response) => {
    const { data, status } = await payment_services.create(
      req.body,
      res.locals.user.id
    );
    return res.status(status).json(data);
  },
};
