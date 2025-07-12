const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const { protect } = require('../middleware/authMiddleware');

// GET /api/chat
router.get('/', protect, async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 }).limit(50);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

module.exports = router;
