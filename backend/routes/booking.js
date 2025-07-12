const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const verifyToken = require("../middleware/authMiddleware");



// Create Booking
router.post("/", verifyToken, async (req, res) => {
  const { doctor, date, reason } = req.body;

  try {
    const booking = await Booking.create({
      patient: req.user.id, // taken from JWT
      doctor,
      date,
      reason
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});




// Get bookings by logged-in user (patient or doctor)
router.get("/mine", verifyToken, async (req, res) => {
  try {
    const role = req.user.role;
    let filter = {};

    if (role === "patient") {
      filter.patient = req.user._id;
    } else if (role === "doctor") {
      filter.doctor = req.user._id;
    }

    const bookings = await Booking.find(filter)
      .populate("patient doctor", "name email role")
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user bookings" });
  }
});


// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("patient doctor", "name email role");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


// Get current user's bookings
router.get("/mine", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.user.id }).populate("doctor", "name email");
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to load bookings" });
  }
});

module.exports = router;
