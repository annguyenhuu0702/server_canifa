import { Router } from "express";
import { productVariant_controller } from "../../controllers/productVariant.controller";

const router = Router();
router.post("/create", productVariant_controller.create);
router.put("/update/:id", productVariant_controller.update);
router.delete("/delete/:id", productVariant_controller.delete);
router.get("/getAll", productVariant_controller.getAll);
router.get("/getById/:id", productVariant_controller.getById);

export default router;
