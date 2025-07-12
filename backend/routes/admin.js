const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const verifyToken = require("../middleware/authMiddleware");

// Admin-only summary route
router.get("/summary", verifyToken, async (req, res) => {
  try {
    // Only allow admins
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const totalUsers = await User.countDocuments();
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalBookings = await Booking.countDocuments();

    const latestBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("patient doctor", "name email role");

    res.json({
      stats: {
        users: { total: totalUsers, patients: totalPatients, doctors: totalDoctors, admins: totalAdmins },
        bookings: { total: totalBookings },
        recent: latestBookings
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load admin summary" });
  }
});

module.exports = router;
