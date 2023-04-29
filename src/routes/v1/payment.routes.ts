import { Router } from "express";
import { payment_controller } from "../../controllers/payment.controller";
import { auth_middlewares } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/create",
  auth_middlewares.loginRequire,
  payment_controller.create
);

export default router;
