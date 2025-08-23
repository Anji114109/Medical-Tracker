// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const userRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicines');
const historyRoutes = require('./routes/history');

const app = express();

// ----- CORS -----
const allowedOrigins = [
  "https://medical-tracker-ver11.vercel.app", // frontend deployed
  "http://localhost:3000"                     // local dev
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow tools like Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked: ${origin} not allowed`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// ----- Middleware -----
app.use(express.json());

// ----- Database -----
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ----- Routes -----
app.use('/api/auth', userRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/history', historyRoutes);

// ----- Serve React build in production -----
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// ----- Handle preflight requests -----
app.options('*', cors());

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
