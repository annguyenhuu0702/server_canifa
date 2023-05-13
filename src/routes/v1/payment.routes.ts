import { Router } from "express";
import { payment_controller } from "../../controllers/payment.controller";
import { auth_middlewares } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/getAll", payment_controller.getAll);
router.get(
  "/getById/:id",
  auth_middlewares.verifyAdmin,
  payment_controller.getById
);
router.get(
  "/getByUser",
  auth_middlewares.loginRequire,
  payment_controller.getByUser
);
router.post(
  "/create",
  auth_middlewares.loginRequire,
  payment_controller.create
);

router.put(
  "/update/:id",
  auth_middlewares.loginRequire,
  payment_controller.update
);

router.delete(
  "/delete/:id",
  auth_middlewares.loginRequire,
  payment_controller.delete
);

router.post(
  "/check-point",
  auth_middlewares.loginRequire,
  payment_controller.checkPoint
);

router.get(
  "/revenue-month",
  auth_middlewares.verifyAdmin,
  payment_controller.getRevenueMonth
);

router.get(
  "/revenue-year",
  auth_middlewares.verifyAdmin,
  payment_controller.getRevenueYear
);

export default router;
