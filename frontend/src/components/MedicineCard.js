import React from "react";
import "./MedicineCard.css";

const MedicineCard = ({ medicine, onEdit, onDelete, onTick, index }) => {
  return (
    <div
      className="medicine-card"
      style={{ animationDelay: `${index * 0.1}s` }} // stagger animation delay
    >
      {/* Medicine details */}
      <div className="medicine-info">
        <h3 className="capsule-box">Name: {medicine.medicineName}</h3>
        <p className="capsule-box">Time: {medicine.time}</p>
        <p className="capsule-box">Days: {medicine.days.join(", ")}</p>
        <p className="capsule-box">
          {medicine.type === "solid"
            ? `No. of Pills: ${medicine.dose}`
            : `Amount (ml): ${medicine.dose}`}
        </p>
      </div>

      {/* Action buttons */}
      <div className="medicine-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(medicine)}
        >
          Edit
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(medicine._id)}
        >
          Delete
        </button>
        <button
          className="btn-tick"
          onClick={() => onTick(medicine)}
        >
          ✓
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;
