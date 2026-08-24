import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  getMyProfile,
  updateMyProfile
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/me", requireAuth, getMyProfile);
router.patch("/me", requireAuth, updateMyProfile);

export default router;
