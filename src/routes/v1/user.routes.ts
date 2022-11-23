import { Router } from "express";
import { user_controller } from "../../controllers/user.controller";

const router = Router();

router.post("/create", user_controller.create);
router.put("/update/:id", user_controller.update);
router.delete("/delete/:id", user_controller.delete);
router.get("/getById/:id", user_controller.getById);
router.get("/getAll", user_controller.getAll);

export default router;
