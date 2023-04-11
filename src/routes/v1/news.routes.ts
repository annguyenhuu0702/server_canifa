import { Router } from "express";
import { news_controller } from "../../controllers/news.controller";

const router = Router();

router.get("/getAll", news_controller.getAll);
router.get("/getById/:id", news_controller.getById);
router.post("/create", news_controller.create);
router.put("/update/:id", news_controller.update);
router.delete("/delete/:id", news_controller.delete);

export default router;
