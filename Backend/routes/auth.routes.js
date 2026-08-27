import { Router } from "express";
import {
  register,
  requestLoginOtp,
  verifyOtp,
  bootstrapAdmin
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login/request-otp", requestLoginOtp);
router.post("/otp/verify", verifyOtp);

// Run once after adding ADMIN_* to .env, then protect/remove this route in production.
router.post("/admin/bootstrap", bootstrapAdmin);

export default router;
