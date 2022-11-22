import { Request, Response } from "express";
import { user_services } from "../services/user.services";

export const user_controller = {
  create: async (req: Request, res: Response) => {
    const { data, status } = await user_services.create(req.body);
    return res.status(status).json(data);
  },
  update: async (req: Request, res: Response) => {
    const { data, status } = await user_services.update(req.params.id);
    return res.status(status).json(data);
  },
};
