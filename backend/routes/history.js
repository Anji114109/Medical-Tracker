// routes/history.js
const express = require("express");
const router = express.Router();
const History = require("../models/History");

// Save ticked history (only once per medicine per user per day)
router.post("/add", async (req, res) => {
  try {
    const { userEmail, medicineName } = req.body;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const alreadyExists = await History.findOne({
      userEmail,
      medicineName,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    if (alreadyExists) {
      return res.status(409).json({ message: "Already marked as taken today." });
    }

    const newEntry = new History(req.body);
    await newEntry.save();
    res.status(200).json({ message: "Marked as taken" });
  } catch (err) {
    console.error("Error saving history:", err);
    res.status(500).json({ message: "Error saving history" });
  }
});

// Get history filtered by days
router.get("/:email", async (req, res) => {
  try {
    const { days } = req.query;
    let query = { userEmail: req.params.email };

    if (days && days !== "all") {
      const limitDate = new Date();
      limitDate.setDate(limitDate.getDate() - parseInt(days));
      query.date = { $gte: limitDate };
    }

    const history = await History.find(query).sort({ date: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
});

module.exports = router;
