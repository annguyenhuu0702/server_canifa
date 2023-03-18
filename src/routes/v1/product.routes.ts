import { Router } from "express";
import { product_controller } from "../../controllers/product.controller";

const router = Router();
router.post("/create", product_controller.create);
router.put("/update/:id", product_controller.update);
router.delete("/delete/:id", product_controller.delete);
router.get("/getAll", product_controller.getAll);
router.get("/getById/:id", product_controller.getById);
router.get("/category/:slug", product_controller.getByCategory);

export default router;
