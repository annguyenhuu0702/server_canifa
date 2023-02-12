import { Router } from "express";
import { productImage_controller } from "../../controllers/productImage.controller";

const router = Router();
router.post("/create", productImage_controller.create);
router.put("/update/:id", productImage_controller.update);
router.delete("/delete/:id", productImage_controller.delete);
router.get("/getAll", productImage_controller.getAll);
router.get("/getById/:id", productImage_controller.getById);

export default router;
