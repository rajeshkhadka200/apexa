import { Router } from "express";
import { getYtData } from "../controller/YtController.js";

//instances
const router = Router();

router.post("/", getYtData);

export default router;
