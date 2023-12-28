import { Router } from "express";
import { getBlog,deleteblogHistory } from "../controller/HashnodeController.js";

//instances
const router = Router();

router.post("/", getBlog);
router.post("/deleteBlog", deleteblogHistory);

export default router;
