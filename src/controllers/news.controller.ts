import { Request, Response } from "express";
import { news_services } from "../services/news.services";

export const news_controller = {
  getAll: async (req: Request, res: Response) => {
    const { data, status } = await news_services.getAll();
    return res.status(status).json(data);
  },
  create: async (req: Request, res: Response) => {
    const { data, status } = await news_services.create(req.body);
    return res.status(status).json(data);
  },
};
