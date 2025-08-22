const History = require("../models/History");

// Add history record
exports.addHistory = async (req, res) => {
  try {
    const newEntry = new History(req.body);
    await newEntry.save();
    res.status(200).json({ message: "Marked as taken" });
  } catch (err) {
    res.status(500).json({ message: "Error saving history" });
  }
};

// Get history by user email
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ userEmail: req.params.email });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
};


// Add history record
exports.addHistory = async (req, res) => {
  try {
    const newEntry = new History(req.body);
    await newEntry.save();
    res.status(200).json({ message: "Marked as taken" });
  } catch (err) {
    res.status(500).json({ message: "Error saving history" });
  }
};

// Get history by user email
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ userEmail: req.params.email });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
};
