import { Router } from "express";
import { productImage_controller } from "../../controllers/productImage.controller";

const router = Router();
router.post("/createMany", productImage_controller.createMany);
router.get("/getAll", productImage_controller.getAll);

export default router;
