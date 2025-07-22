import React, { useState } from "react";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ setShowForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        setMessage("No user found with this email.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Invalid email address.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => setShowForgotPassword(false)} style={{ marginTop: "20px" }}>
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
