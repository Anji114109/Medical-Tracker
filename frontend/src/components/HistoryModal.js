import React, { useEffect, useState, useCallback } from "react";
import "./HistoryModal.css";

const HistoryModal = ({ user, onClose }) => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("7");

  const API_URL = process.env.REACT_APP_API_URL; // ✅ backend URL

  const fetchHistory = useCallback(
    async (days) => {
      try {
        const res = await fetch(
          `${API_URL}/history/${encodeURIComponent(user.email)}?days=${days}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch history");
        }
        setHistory(data);
      } catch (err) {
        alert("Failed to load history: " + err.message);
      }
    },
    [API_URL, user.email]
  );

  useEffect(() => {
    fetchHistory(filter);
  }, [filter, fetchHistory]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content history-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Medicine History</h2>
        <div className="history-filter">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="all">Complete History</option>
          </select>
        </div>

        <div className="user-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>

        <table className="history-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No records found.
                </td>
              </tr>
            ) : (
              history.map((item) => (
                <tr
                  key={item._id}
                  className={item.taken ? "taken" : "not-taken"}
                >
                  <td>{item.medicineName}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.time}</td>
                  <td>{item.taken ? "Taken" : "Not Taken"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button className="btn-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;
