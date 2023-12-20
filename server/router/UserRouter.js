import { Router } from "express";
import { getUser,userLogout } from "../controller/UserController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

//Instance
const router = Router();

router.get("/", AuthMiddleware, getUser);
router.post("/logout",userLogout)

export default router;
