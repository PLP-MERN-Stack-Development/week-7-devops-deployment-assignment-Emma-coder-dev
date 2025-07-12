const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Get all users with search, pagination, and sorting
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort = 'name' } = req.query;

    // Build dynamic query
    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };

    const users = await User.find(query)
      .select('-password')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      users
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};



// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort = '-date' } = req.query;

    const query = {
      $or: [
        { reason: { $regex: search, $options: 'i' } },
        // Optionally search on patient or doctor names later using aggregation
      ]
    };

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email')
      .populate('doctor', 'name email')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Appointment.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      appointments
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};


// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalAppointments = await Appointment.countDocuments();

    res.json({
      users: totalUsers,
      doctors: totalDoctors,
      patients: totalPatients,
      appointments: totalAppointments
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
};
