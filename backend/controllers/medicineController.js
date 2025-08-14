const Medicine = require("C://Users//ambat//OneDrive//Documents//projects//medicineRemainder//mernproject//backend//models//Medicine");

// Add medicine
exports.addMedicine = async (req, res) => {
  try {
    const newMed = new Medicine(req.body);
    await newMed.save();
    res.status(200).json({ message: "Medicine added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add medicine" });
  }
};

// Get medicines by user email
exports.getMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find({ "userDetails.email": req.params.email });
    res.status(200).json(meds);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving medicines" });
  }
};

// Update medicine
exports.updateMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
};

// Delete medicine
exports.deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
};
