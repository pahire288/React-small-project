import React, { useState } from "react";
import { auth } from "./firebase";
import { sendEmailVerification } from "firebase/auth";

const Welcome = () => {
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

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
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
