import { Router } from "express";
import { variantValue_controller } from "../../controllers/variantValue.controller";

const router = Router();
router.post("/create", variantValue_controller.create);
router.get("/getAll", variantValue_controller.getAll);

export default router;
