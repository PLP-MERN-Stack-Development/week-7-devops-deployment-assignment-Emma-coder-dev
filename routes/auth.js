const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);
;

router.get('/me', protect, (req, res) => {
  res.json(req.user);
});


module.exports = router;

const OtpCode = require('../models/OtpCode');
const sendEmail = require('../utils/sendEmail');

// Request OTP
router.post('/request-code', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await OtpCode.create({
    email,
    code,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 mins
  });

  await sendEmail(
    email,
    'Your QuickClinic Login Code',
    `<p>Your login code is: <strong>${code}</strong></p>`
  );

  res.json({ message: 'OTP sent to email' });
});

// Verify OTP
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  const otp = await OtpCode.findOne({ email, code });
  if (!otp || otp.expiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired code' });
  }

  await OtpCode.deleteOne({ _id: otp._id });

  const user = await User.findOne({ email });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.json({ token, user });
});
