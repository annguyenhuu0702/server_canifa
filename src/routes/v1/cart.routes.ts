import { Router } from "express";
import { cart_controller } from "../../controllers/cart.controller";

const router = Router();

router.post("/create", cart_controller.create);

export default router;
