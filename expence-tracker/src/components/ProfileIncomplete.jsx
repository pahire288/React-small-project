import React from "react";

const ProfileIncomplete = ({ setShowCompleteProfile }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Your profile is incomplete</h2>
      <button onClick={() => setShowCompleteProfile(true)}>
        Complete Profile
      </button>
    </div>
  );
};

export default ProfileIncomplete;
