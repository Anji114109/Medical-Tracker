const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Fixed path

// Register a new user
router.post("/register", async (req, res) => {
  const { name, age, gender, phone, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, age, gender, phone, email, password });
    await newUser.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Email not found. Please sign up first." });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: existingUser.name,
        age: existingUser.age,
        gender: existingUser.gender,
        phone: existingUser.phone,
        email: existingUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;