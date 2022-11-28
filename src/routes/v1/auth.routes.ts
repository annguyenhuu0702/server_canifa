import { Router } from "express";
import { auth_controller } from "../../controllers/auth.controller";
import { auth_middlewares } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", auth_controller.register);
router.post("/login", auth_controller.login);
router.post(
  "/refreshToken",
  auth_middlewares.loginRequire,
  auth_controller.refreshToken
);
router.post("/logout", auth_middlewares.loginRequire, auth_controller.logout);
router.get(
  "/getProfile",
  auth_middlewares.loginRequire,
  auth_controller.getProfile
);
router.put(
  "/changeProfile",
  auth_middlewares.loginRequire,
  auth_controller.changeProfile
);
router.put(
  "/changePassword",
  auth_middlewares.loginRequire,
  auth_controller.changePassword
);
router.put(
  "/changeEmail",
  auth_middlewares.loginRequire,
  auth_controller.changeEmail
);

export default router;
