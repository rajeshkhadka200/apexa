import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
const router = Router();

router.post("/", AuthController);
export default router;
