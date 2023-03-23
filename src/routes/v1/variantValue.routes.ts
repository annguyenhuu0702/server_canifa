import { Router } from "express";
import { variantValue_controller } from "../../controllers/variantValue.controller";
import { auth_middlewares } from "../../middlewares/auth.middleware";

const router = Router();
router.post(
  "/create",
  auth_middlewares.verifyAdmin,
  variantValue_controller.create
);
router.get("/getAll", variantValue_controller.getAll);

export default router;
