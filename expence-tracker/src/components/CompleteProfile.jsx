// src/components/CompleteProfile.jsx

import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

const CompleteProfile = ({ setProfileUpdated }) => {
  const auth = getAuth();
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: photoURL,
      });
      console.log("Profile updated successfully");
      setMessage("Profile updated successfully.");
      setProfileUpdated(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="complete-profile-container">
      <form className="complete-profile-form" onSubmit={handleUpdateProfile}>
        <h2>Complete Your Profile</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Profile Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        /><br />
        <button type="submit">Update</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CompleteProfile;
