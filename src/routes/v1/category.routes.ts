import { Router } from "express";
import { category_controller } from "../../controllers/category.controller";

const router = Router();
router.post("/create", category_controller.create);
router.put("/update/:id", category_controller.update);
router.delete("/delete/:id", category_controller.delete);
router.get("/getAll", category_controller.getAll);
router.get("/getById/:id", category_controller.getById);
router.get("/getBySlug/:categorySlug", category_controller.getBySlug);

export default router;
