import { Router } from "express";
import uploadRouter from "./upload.routes";
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
import cartItemRouter from "./cartItem.routes";
import cartRouter from "./cart.routes";
import favoriteProductRouter from "./favoriteProduct.routes";
import discountRouter from "./discount.routes";
import newsRouter from "./news.routes";
import commentRouter from "./comment.routes";
import paymentRouter from "./payment.routes";
import adminRouter from "./admin.routes";

const router = Router();
router.use("/api/upload", uploadRouter);
router.use("/api/user", userRouter);
router.use("/api/auth", authRouter);
router.use("/api/category", categoryRouter);
router.use("/api/collection", collectionRouter);
router.use("/api/productCategory", productCategoryRouter);
router.use("/api/product", productRouter);
router.use("/api/productVariant", productVariantRouter);
router.use("/api/variant", variantRouter);
router.use("/api/variantValue", variantValueRouter);
router.use("/api/productImage", productImageRouter);
router.use("/api/cartItem", cartItemRouter);
router.use("/api/cart", cartRouter);
router.use("/api/favoriteProduct", favoriteProductRouter);
router.use("/api/discount", discountRouter);
router.use("/api/news", newsRouter);
router.use("/api/comment", commentRouter);
router.use("/api/payment", paymentRouter);
router.use("/api/admin", adminRouter);

export default router;
