import Booking from "../models/Booking.js";

// This runs when frontend calls: GET /api/bookings/stats
export async function getCustomerStats(req, res) {
  try {
    const customerId = req.userId; // set by the auth middleware

    const activeStatuses = ["Pending", "Accepted", "In Progress"];

    // countDocuments just counts how many matching rows exist — very fast
    const [activeBookings, completedJobs] = await Promise.all([
      Booking.countDocuments({ customer: customerId, status: { $in: activeStatuses } }),
      Booking.countDocuments({ customer: customerId, status: "Completed" })
    ]);

    return res.json({
      activeBookings,
      completedJobs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not load dashboard stats" });
  }
}