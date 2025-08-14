const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

// Add medicine
router.post("/add", async (req, res) => {
  try {
    const newMed = new Medicine({
      ...req.body,
      userEmail: req.body.userEmail, // ✅ Corrected key
    });
    await newMed.save();
    res.status(200).json({ message: "Medicine added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add medicine" });
  }
});

// Get medicines for user
router.get("/:email", async (req, res) => {
  try {
    const meds = await Medicine.find({ userEmail: req.params.email });
    res.status(200).json(meds);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving medicines" });
  }
});

// Delete medicine
router.delete("/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
});

// Update medicine
router.put("/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
});

module.exports = router;
