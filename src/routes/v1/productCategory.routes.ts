import { Router } from "express";
import { productCategory_controller } from "../../controllers/productCategory.controller";

const router = Router();
router.post("/create", productCategory_controller.create);
router.put("/update/:id", productCategory_controller.update);
router.delete("/delete/:id", productCategory_controller.delete);
router.get("/getAll", productCategory_controller.getAll);
router.get("/getById/:id", productCategory_controller.getById);

export default router;
