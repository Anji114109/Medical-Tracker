// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const userRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicines');
const historyRoutes = require('./routes/history');

const app = express();
dotenv.config();

// ----- CORS -----
const allowedOrigins = [
  "https://medical-tracker-ver10.vercel.app", // frontend
  "http://localhost:3000"                     // local dev
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ----- Middleware -----
app.use(express.json());

// ----- Database -----
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// ----- Routes -----
app.use('/api/auth', userRoutes);        // ✅ FIXED PREFIX
app.use('/api/medicines', medicineRoutes);
app.use('/api/history', historyRoutes);

// ----- Serve React build -----
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
