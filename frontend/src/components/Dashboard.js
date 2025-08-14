import React, { useEffect, useState, useCallback } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import AddMedicineModal from "./AddMedicineModal";
import ProfileModal from "./ProfileModal";
import HistoryModal from "./HistoryModal";
import MedicineCard from "./MedicineCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const [medicines, setMedicines] = useState([]);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Wrapped fetchMedicines in useCallback so we can safely use it in useEffect
  const fetchMedicines = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/medicines/${userData.email}`
      );
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      alert("Error fetching medicines");
    }
  }, [userData.email]);

  useEffect(() => {
    if (!userData) {
      navigate("/");
      return;
    }
    fetchMedicines();
  }, [userData, navigate, fetchMedicines]);

  const openAddMedicine = () => {
    setSelectedMedicine(null);
    setShowAddMedicine(true);
  };

  const openEditMedicine = (med) => {
    setSelectedMedicine(med);
    setShowAddMedicine(true);
  };

  const deleteMedicine = async (id) => {
    if (window.confirm("Are you sure to delete this medicine?")) {
      try {
        await fetch(`http://localhost:5000/api/medicines/${id}`, {
          method: "DELETE",
        });
        fetchMedicines();
      } catch (err) {
        alert("Failed to delete medicine");
      }
    }
  };

  const handleTick = async (medicine) => {
    try {
      const payload = {
        userEmail: userData.email,
        medicineName: medicine.medicineName,
        date: new Date(),
        time: medicine.time,
        taken: true,
      };

      const res = await fetch("http://localhost:5000/api/history/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 409) {
        alert("You've already marked this medicine as taken today.");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to save history");
      }

      alert("Medicine marked as taken");
    } catch (err) {
      alert("Error marking medicine: " + err.message);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="hello-user">Hello, {userData?.name}</h1>
        <div className="dashboard-buttons">
          <button onClick={() => setShowProfile(true)}>Profile</button>
          <button onClick={openAddMedicine}>Add Medicines</button>
          <button onClick={() => setShowHistory(true)}>History</button>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <main>
        {medicines.length === 0 ? (
          <p className="empty-msg">You haven't added any medicines yet.</p>
        ) : (
          <div className="medicine-list">
            {medicines.map((med, index) => (
              <MedicineCard
                key={med._id}
                medicine={med}
                index={index}
                onEdit={openEditMedicine}
                onDelete={deleteMedicine}
                onTick={handleTick}
              />
            ))}
          </div>
        )}
      </main>

      {showAddMedicine && (
        <AddMedicineModal
          user={userData}
          medicine={selectedMedicine}
          onClose={() => {
            setShowAddMedicine(false);
            fetchMedicines();
          }}
        />
      )}

      {showProfile && (
        <ProfileModal user={userData} onClose={() => setShowProfile(false)} />
      )}

      {showHistory && (
        <HistoryModal user={userData} onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
};

export default Dashboard;
