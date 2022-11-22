import { Router } from "express";
import userRouter from "./user.routes";

const router = Router();

router.use("/api/user", userRouter);

export default router;
