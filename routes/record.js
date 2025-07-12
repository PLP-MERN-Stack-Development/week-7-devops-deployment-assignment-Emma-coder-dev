const express = require('express');
const router = express.Router();
const MedicalRecord = require('../models/MedicalRecord');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// POST: Add record
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    const record = await MedicalRecord.create({
      patient: req.body.patient,
      doctor: req.user._id,
      diagnosis: req.body.diagnosis,
      notes: req.body.notes,
      file: req.file?.filename || ''
    });

    res.status(201).json({ message: 'Record saved', record });
  } catch (err) {
    res.status(500).json({ error: 'Error saving record' });
  }
});

// GET: Get all records for a patient
router.get('/:patientId', protect, async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.patientId })
      .populate('doctor', 'name email')
      .sort({ createdAt: -1 });

    res.json({ records });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching records' });
  }
});

module.exports = router;
