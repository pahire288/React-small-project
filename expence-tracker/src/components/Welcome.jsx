import React, { useState } from "react";
import { auth } from "./firebase";
import { sendEmailVerification, signOut } from "firebase/auth";

const Welcome = ({ setIsLoggedIn }) => {
  const user = auth.currentUser;
  const [message, setMessage] = useState("");

  const verifyEmailHandler = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setMessage("Verification email sent! Please check your inbox.");
      } catch (error) {
        console.error(error);
        if (error.code === "auth/too-many-requests") {
          setMessage("Too many requests. Please try again later.");
        } else if (error.code === "auth/user-not-found") {
          setMessage("User not found. Please login again.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      }
    } else {
      setMessage("No user logged in.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("idToken");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "8px 16px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <h2>Welcome, {user?.email}</h2>
      <p>Email verified: {user?.emailVerified ? "Yes ✅" : "No ❌"}</p>

      {!user?.emailVerified && (
        <>
          <p>Your profile is incomplete.</p>
          <button onClick={verifyEmailHandler}>Verify Email</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default Welcome;
