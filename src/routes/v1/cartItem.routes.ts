import { Router } from "express";
import { cartItem_controller } from "../../controllers/cartItem.controller";

const router = Router();

router.post("/create", cartItem_controller.create);

export default router;
