import { Router } from "express";
import { user_controller } from "../../controllers/user.controller";

const router = Router();

router.post("/create", user_controller.create);
router.put("/update", user_controller.update);

export default router;
