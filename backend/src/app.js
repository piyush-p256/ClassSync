// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5174', 'https://class-sync-seven.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Middlewares
const auth = require('./middlewares/authMiddleware');
const schoolContext = require('./middlewares/schoolContext');

app.get('/', (req, res) => {
  res.send('AutoSubstitute API running');
});

// 🟢 Public Routes (NO auth)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const schoolRoutes = require('./routes/schoolRoutes');
app.use('/api/schools', schoolRoutes);

const chatbotRoutes = require('./routes/chatbotRoutes.js');
app.use('/api/chatbot', chatbotRoutes);

// 🔒 Protected Routes (WITH auth & context)
app.use(auth); // ← Only from this point on
app.use(schoolContext);

const scheduleRoutes = require('./routes/scheduleRoutes');
app.use('/api/schedules', scheduleRoutes);

const substitutionRoutes = require('./routes/substitutionRoutes');
app.use('/api/substitutions', substitutionRoutes);

const leaveRoutes = require('./routes/leaveRoutes');
app.use('/api/leaves', leaveRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

const conflictRoutes = require('./routes/conflictRoutes');
app.use('/api/conflicts', conflictRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);



module.exports = app;
