import { Router } from "express";
import { collection_controller } from "../../controllers/collection.controller";

const router = Router();
router.post("/create", collection_controller.create);
router.put("/update/:id", collection_controller.update);
router.delete("/delete/:id", collection_controller.delete);
router.get("/getAll", collection_controller.getAll);
router.get("/getById/:id", collection_controller.getById);

export default router;
