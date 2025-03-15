import express, { Router } from "express";
const router: Router = express.Router();
import {
  createUser,
  loginUser,
  userAuthenticationMiddleware,
  dashboardAccess,
  logoutUser,
} from "../controllers/useController";

router.post("/create_user", createUser);
router.post("/login_user", loginUser);
router.get("/protected_route", userAuthenticationMiddleware, dashboardAccess);
router.get("/logout_user", logoutUser);

export default router;
