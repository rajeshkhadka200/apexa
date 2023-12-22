import { Router } from "express";
import { getYtData } from "../controller/YtController.js";

//instances
const router = Router();

router.get("/", getYtData);

export default router;
