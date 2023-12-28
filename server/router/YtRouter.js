import { Router } from "express";
import { deleteYTHistory, getYtData } from "../controller/YtController.js";

//instances
const router = Router();

router.post("/", getYtData);
router.delete("/:video_id", deleteYTHistory);

export default router;
