const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/adminController');


const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  deleteUser,
  getAllAppointments,
  deleteAppointment
} = require('../controllers/adminController');

// Admin: get all users
router.get('/users', protect, authorize('admin'), getAllUsers);

// Admin: delete user
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

// Admin: get all appointments
router.get('/appointments', protect, authorize('admin'), getAllAppointments);

// Admin: delete appointment
router.delete('/appointments/:id', protect, authorize('admin'), deleteAppointment);

router.get('/stats', protect, authorize('admin'), getStats);

module.exports = router;
