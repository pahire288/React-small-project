// src/App.jsx

import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="App">
      {!isLoggedIn ? (
        <>
          {showSignup ? (
            <>
              <Signup />
              <p onClick={() => setShowSignup(false)} style={{ cursor: "pointer", color: "blue" }}>
                Already have an account? Login
              </p>
            </>
          ) : (
            <>
              <Login setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
              <p onClick={() => setShowSignup(true)} style={{ cursor: "pointer", color: "blue" }}>
                Don't have an account? Signup
              </p>
            </>
          )}
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;
