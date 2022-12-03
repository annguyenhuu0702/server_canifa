import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import categoryRouter from "./category.routes";
import collectionRouter from "./collection.routes";
import productCategoryRouter from "./productCategory.routes";

const router = Router();

router.use("/api/user", userRouter);
router.use("/api/auth", authRouter);
router.use("/api/category", categoryRouter);
router.use("/api/collection", collectionRouter);
router.use("/api/productCategory", productCategoryRouter);

export default router;
