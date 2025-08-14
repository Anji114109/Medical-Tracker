import React from "react";
import "./ProfileModal.css";

const ProfileModal = ({ user, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content profile-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>User Profile</h2>
        <div className="profile-details">
          <p className="capsule-box">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="capsule-box">
            <strong>Age:</strong> {user.age}
          </p>
          <p className="capsule-box">
            <strong>Gender:</strong> {user.gender}
          </p>
          <p className="capsule-box">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="capsule-box">
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="profile-buttons">
          <button className="btn-white" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
