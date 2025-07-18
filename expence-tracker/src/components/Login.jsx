import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import ForgotPassword from "./ForgotPassword";

const Login = ({ setIsLoggedIn, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      localStorage.setItem("idToken", token);
      setToken(token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  if (showForgotPassword) {
    return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          style={{ marginTop: "10px" }}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default Login;
