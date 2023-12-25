import { Router } from "express";
import { getBlog } from "../controller/HashnodeController.js";

//instances
const router = Router();

router.post("/", getBlog);

export default router;
