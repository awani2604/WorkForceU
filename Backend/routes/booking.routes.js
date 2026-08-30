import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getCustomerStats } from "../controllers/booking.controller.js";

const router = Router();

// GET /api/bookings/stats  -> only works if a valid login token is sent
router.get("/stats", protect, getCustomerStats);

export default router;