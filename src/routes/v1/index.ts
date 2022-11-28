import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const router = Router();

router.use("/api/user", userRouter);
router.use("/api/auth", authRouter);

export default router;
