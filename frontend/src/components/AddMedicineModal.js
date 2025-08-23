import React, { useState, useEffect } from "react";
import "./AddMedicineModal.css";

const daysOfWeek = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

const AddMedicineModal = ({ user, medicine, onClose }) => {
  const [formData, setFormData] = useState({
    medicineName: "",
    time: "",
    days: [],
    type: "solid",
    dose: "",
  });

  const [everyday, setEveryday] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL; // ✅ backend URL

  useEffect(() => {
    if (medicine) {
      setFormData({
        medicineName: medicine.medicineName || "",
        time: medicine.time || "",
        days: medicine.days || [],
        type: medicine.type || "solid",
        dose: medicine.dose || "",
      });
      setEveryday(medicine.days.includes("Everyday"));
    }
  }, [medicine]);

  useEffect(() => {
    if (everyday) {
      setFormData((prev) => ({ ...prev, days: ["Everyday"] }));
    }
  }, [everyday]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDay = (day) => {
    if (everyday) return;
    if (formData.days.includes(day)) {
      setFormData((prev) => ({
        ...prev,
        days: prev.days.filter((d) => d !== day),
      }));
    } else {
      setFormData((prev) => ({ ...prev, days: [...prev.days, day] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.medicineName || !formData.time || formData.days.length === 0) {
      alert("Please fill all required fields and select days.");
      return;
    }

    const payload = {
      userEmail: user.email,
      userName: user.name,
      userPhone: user.phone,
      userAge: user.age,
      medicineName: formData.medicineName,
      time: formData.time,
      days: everyday ? ["Everyday"] : formData.days,
      type: formData.type,
      dose: formData.dose,
    };

    try {
      let url = `${API_URL}/medicines/add`; // ✅ use env variable
      let method = "POST";

      if (medicine) {
        url = `${API_URL}/medicines/${medicine._id}`; // ✅ use env variable
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save medicine");
      } else {
        onClose();
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{medicine ? "Edit Medicine" : "Add Medicine"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Medicine Name:
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Time (24-hour format):
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>

          <div className="days-selection">
            <label>
              <input
                type="checkbox"
                checked={everyday}
                onChange={() => setEveryday(!everyday)}
              />
              Everyday
            </label>
            {!everyday &&
              daysOfWeek.map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    checked={formData.days.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                  {day}
                </label>
              ))}
          </div>

          <div className="type-selection">
            <label>
              <input
                type="radio"
                name="type"
                value="solid"
                checked={formData.type === "solid"}
                onChange={handleChange}
              />
              Solid
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="liquid"
                checked={formData.type === "liquid"}
                onChange={handleChange}
              />
              Liquid
            </label>
          </div>

          {formData.type === "solid" ? (
            <label>
              Number of Pills:
              <input
                type="number"
                name="dose"
                min="1"
                value={formData.dose}
                onChange={handleChange}
                required
              />
            </label>
          ) : (
            <label>
              Amount (ml):
              <input
                type="number"
                name="dose"
                min="1"
                value={formData.dose}
                onChange={handleChange}
                required
              />
            </label>
          )}

          <div className="modal-buttons">
            <button type="submit" className="btn-save">
              Save
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;
