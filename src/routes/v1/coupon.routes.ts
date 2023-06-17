import { Router } from "express";
import { coupon_controller } from "../../controllers/coupon.controller";

const router = Router();

router.get("/getAll", coupon_controller.getAll);
router.post("/create", coupon_controller.create);

export default router;
