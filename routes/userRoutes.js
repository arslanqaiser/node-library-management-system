import express from "express";

import { getAllUser, registerNewAdmin } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { isAuthorized } from "../controllers/authController.js";

const router = express.Router();
router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUser);
router.post(
  "/add/new-admin",
  isAuthenticated,
  isAuthorized("Admin"),
  registerNewAdmin
);

export default router;
