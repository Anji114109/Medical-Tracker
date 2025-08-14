// models/History.js
const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userEmail: String,
  medicineName: String,
  date: Date,          // ✅ changed from String to Date
  time: String,        // keep as string for display
  taken: Boolean,
});

module.exports = mongoose.model("History", historySchema);
