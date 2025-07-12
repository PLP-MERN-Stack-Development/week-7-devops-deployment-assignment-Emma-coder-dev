const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');


// Book a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      time,
      reason
    });

    await sendEmail(
      req.user.email,
      'Appointment Confirmation - QuickClinic',
      `
        <h3>Dear ${req.user.name},</h3>
        <p>Your appointment has been booked with doctor ID <strong>${doctor}</strong>.</p>
        <p><strong>Date:</strong> ${date} at ${time}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>Thank you for using QuickClinic.</p>
      `
    );

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not book appointment' });
  }
};


// Get appointments (for patient or doctor)
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [
        { patient: req.user._id },
        { doctor: req.user._id }
      ]
    }).populate('patient', 'name email').populate('doctor', 'name email');

    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load appointments' });
  }
};

// Cancel appointment (only by patient)
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not allowed to cancel this appointment' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled', appointment });
  } catch (err) {
    res.status(500).json({ error: 'Could not cancel appointment' });
  }
};
