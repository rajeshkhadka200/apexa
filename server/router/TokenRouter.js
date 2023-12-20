import { Router } from "express";
import { getNewToken, getAllTokens } from "../controller/TokenController.js";

//Instance
const router = Router();

router.post("/refresh", getNewToken);
router.get("/all", getAllTokens);

export default router;
