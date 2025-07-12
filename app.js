require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const path = require('path');
const ChatMessage = require('./models/ChatMessage');
const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);
const recordRoutes = require('./routes/record');
app.use('/api/records', recordRoutes);


const app = express();

// Security & utility middleware
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(hpp());
app.use(morgan('dev'));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiter
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use('/uploads', express.static('uploads'));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to QuickClinic API 🩺' });
});

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('🟢 New user connected');

  socket.on('chatMessage', async (data) => {
  const msg = {
    user: data.user,
    message: data.message,
    time: new Date().toLocaleTimeString()
  };

  // Save to MongoDB
  await ChatMessage.create(msg);

  // Broadcast to all
  io.emit('chatMessage', msg);
});


  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server + Socket.IO running on port ${PORT}`);
});

