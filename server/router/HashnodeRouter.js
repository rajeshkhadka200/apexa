import { Router } from "express";
import {
  getBlog,
  deleteblogHistory,
  toggleNotification,
} from "../controller/HashnodeController.js";

//instances
const router = Router();

router.post("/", getBlog);
router.post("/deleteBlog", deleteblogHistory);
router.patch("/updateNotif", toggleNotification);

export default router;
