// src/components/ProfileIncomplete.jsx

import React from "react";

const ProfileIncomplete = ({ setShowCompleteProfile }) => {
  return (
    <div className="profile-incomplete-container">
      <h2>Your profile is incomplete</h2>
      <button onClick={() => setShowCompleteProfile(true)}>Complete Profile</button>
    </div>
  );
};

export default ProfileIncomplete;
