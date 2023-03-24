import { Request, Response, Router } from "express";
import { favoriteProduct_controller } from "../../controllers/favoriteProduct.controller";
import { auth_middlewares } from "../../middlewares/auth.middleware";

const route = Router();
route.get(
  "/getAll",
  auth_middlewares.loginRequire,
  favoriteProduct_controller.getAll
);
route.post(
  "/create",
  auth_middlewares.loginRequire,
  favoriteProduct_controller.create
);
route.get(
  "/getByUser",
  auth_middlewares.loginRequire,
  favoriteProduct_controller.getByUser
);

export default route;
