import { Request, Response } from "express";
import { variantValue_services } from "../services/variantValue.services";

export const variantValue_controller = {
  create: async (req: Request, res: Response) => {
    const { data, status } = await variantValue_services.create(req.body);
    return res.status(status).json(data);
  },
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await variantValue_services.getAll(req.query);
    return res.status(status).json(data);
  },
};
