import { Router } from "express";
import { getBlog } from "../controller/HashnodeController.js";

//instances
const router = Router();

router.get("/", getBlog);

export default router;
