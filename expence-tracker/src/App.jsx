// src/App.jsx

import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import ProfileIncomplete from "./components/ProfileIncomplete";
import CompleteProfile from "./components/CompleteProfile";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

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
        <>
          {!profileUpdated ? (
            showCompleteProfile ? (
              <CompleteProfile setProfileUpdated={setProfileUpdated} />
            ) : (
              <ProfileIncomplete setShowCompleteProfile={setShowCompleteProfile} />
            )
          ) : (
            <Welcome />
          )}
        </>
      )}
    </div>
  );
}

export default App;
