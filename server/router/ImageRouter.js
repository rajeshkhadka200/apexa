import { Router } from "express";
import { generateAiImage } from "../controller/ImageController.js";

//instances
const router = Router();

router.post("/", generateAiImage);

export default router;
