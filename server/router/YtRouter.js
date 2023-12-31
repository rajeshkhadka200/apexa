import { Router } from "express";
import {
  deleteYTHistory,
  getYtData,
  toggleNotification,
} from "../controller/YtController.js";

//instances
const router = Router();

router.post("/", getYtData);
router.delete("/:video_id", deleteYTHistory);
router.patch("/:video_id", toggleNotification);

export default router;
