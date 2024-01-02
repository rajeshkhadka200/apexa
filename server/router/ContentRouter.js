import { Router } from "express";
import { generateContent } from "../controller/ContentController.js";

const router = Router();

router.get("/:scope/:details", generateContent);
export default router;
