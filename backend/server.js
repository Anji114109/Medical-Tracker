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

// ----- CORS (allow all for now) -----
app.use(cors());

// ----- Middleware -----
app.use(express.json());

// ----- Database -----
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ----- Routes (no /api prefix) -----
app.use('/auth', userRoutes);
app.use('/medicines', medicineRoutes);
app.use('/history', historyRoutes);

// ----- Serve React build in production -----
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
