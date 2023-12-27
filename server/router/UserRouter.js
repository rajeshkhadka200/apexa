import { Router } from "express";
import {
  generateBolgHistory,
  generateYtHistory,
  getUser,
  userLogout,
} from "../controller/UserController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

//Instance
const router = Router();

router.get("/", AuthMiddleware, getUser);
router.post("/logout", userLogout);
router.get("/getytHistory/:user_id", generateYtHistory);
router.get("/getblogHistory/:user_id", generateBolgHistory);

export default router;
