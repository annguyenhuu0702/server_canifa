import { Request, Response } from "express";
import { productVariant_services } from "../services/productVariant.services";

export const productVariant_controller = {
  create: async (req: Request, res: Response) => {
    const { data, status } = await productVariant_services.createMany(req.body);
    return res.status(status).json(data);
  },
  update: async (req: Request, res: Response) => {
    const { data, status } = await productVariant_services.update(
      req.params.id,
      req.body
    );
    return res.status(status).json(data);
  },
  delete: async (req: Request, res: Response) => {
    const { data, status } = await productVariant_services.delete(
      req.params.id
    );
    return res.status(status).json(data);
  },
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await productVariant_services.getAll(req.query);
    return res.status(status).json(data);
  },
  getById: async (req: Request, res: Response) => {
    const { data, status } = await productVariant_services.getById(
      req.params.id
    );
    return res.status(status).json(data);
  },
};
