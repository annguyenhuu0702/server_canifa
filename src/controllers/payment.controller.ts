import { Request, Response } from "express";
import { payment_services } from "../services/payment.services";

export const payment_controller = {
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await payment_services.getAll(req.query);
    return res.status(status).json(data);
  },
  getById: async (req: Request, res: Response) => {
    const { data, status } = await payment_services.getById(req.params.id);
    return res.status(status).json(data);
  },
  create: async (req: Request, res: Response) => {
    const { data, status } = await payment_services.create(
      req.body,
      res.locals.user.id
    );
    return res.status(status).json(data);
  },
  update: async (req: Request, res: Response) => {
    const { data, status } = await payment_services.update(
      req.params.id,
      req.body
    );
    return res.status(status).json(data);
  },
  delete: async (req: Request, res: Response) => {
    const { data, status } = await payment_services.delete(req.params.id);
    return res.status(status).json(data);
  },
};
