import { Router } from "express";
import { variant_controller } from "../../controllers/variant.controller";

const router = Router();
router.post("/create", variant_controller.create);
router.get("/getAll", variant_controller.getAll);

export default router;
