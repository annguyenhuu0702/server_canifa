import { Router } from "express";
import { news_controller } from "../../controllers/news.controller";

const router = Router();

router.get("/getAll", news_controller.getAll);
router.post("/create", news_controller.create);

export default router;
