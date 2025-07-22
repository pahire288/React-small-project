import React, { useState, useEffect } from "react";

const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIdToken(token);

    const fetchData = async () => {
      if (!token) return;

      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC44GiGCfzmvLH1iqYKqsyHuOjHYrEG_b0`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          }
        );
        const data = await res.json();
        if (data.users && data.users.length > 0) {
          const user = data.users[0];
          setFullName(user.displayName || "");
          setProfilePhoto(user.photoUrl || "");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC44GiGCfzmvLH1iqYKqsyHuOjHYrEG_b0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken,
            displayName: fullName,
            photoUrl: profilePhoto,
            returnSecureToken: true,
          }),
        }
      );
      const data = await res.json();
      console.log("Profile updated:", data);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Profile Photo URL"
          value={profilePhoto}
          onChange={(e) => setProfilePhoto(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
  },
};

export default CompleteProfile;
