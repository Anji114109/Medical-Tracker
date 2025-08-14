const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  userEmail: String, // Link to the user
  userName: String,
  userPhone: String,
  userAge: Number,
  medicineName: String,
  time: String,
  days: [String], // ['Monday', 'Tuesday', ...] or ['Everyday']
  type: String, // solid or liquid
  dose: String, // pills or ml
});

module.exports = mongoose.model("Medicine", medicineSchema);
