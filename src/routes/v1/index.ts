import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import categoryRouter from "./category.routes";
import collectionRouter from "./collection.routes";
import productCategoryRouter from "./productCategory.routes";
import productRouter from "./product.routes";
import productVariantRouter from "./productVariant.routes";
import variantRouter from "./variant.routes";
import variantValueRouter from "./variantValue.routes";
import productImageRouter from "./productImage.routes";

const router = Router();

router.use("/api/user", userRouter);
router.use("/api/auth", authRouter);
router.use("/api/category", categoryRouter);
router.use("/api/collection", collectionRouter);
router.use("/api/productCategory", productCategoryRouter);
router.use("/api/product", productCategoryRouter);
router.use("/api/productVariant", productCategoryRouter);
router.use("/api/variant", productCategoryRouter);
router.use("/api/variantValue", productCategoryRouter);
router.use("/api/productImage", productCategoryRouter);

export default router;
