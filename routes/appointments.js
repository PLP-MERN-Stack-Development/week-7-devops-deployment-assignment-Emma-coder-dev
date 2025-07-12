const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment
} = require('../controllers/appointmentController');

// Book appointment
router.post('/', protect, bookAppointment);

// View appointments
router.get('/my', protect, async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'doctor') {
      appointments = await Appointment.find({ doctor: req.user._id }).populate('patient', 'name email');
    } else {
      appointments = await Appointment.find({ patient: req.user._id }).populate('doctor', 'name email');
    }

    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get appointments' });
  }
});


// Cancel appointment
router.put('/:id/cancel', protect, cancelAppointment);

// Upload medical report
router.post('/upload', protect, upload.single('report'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'File uploaded',
    filename: req.file.filename
  });
});


module.exports = router;
