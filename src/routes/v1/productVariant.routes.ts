import { Router } from "express";
import { productVariant_controller } from "../../controllers/productVariant.controller";

const router = Router();
router.post("/create", productVariant_controller.create);
router.put("/update", productVariant_controller.update);
router.get("/getAll", productVariant_controller.getAll);

export default router;
