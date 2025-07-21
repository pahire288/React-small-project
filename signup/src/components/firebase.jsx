// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLG6SNrktjzMr10g5H9D9Dmsp8N5bsCKY",
  authDomain: "login-auth-9cc37.firebaseapp.com",
  projectId: "login-auth-9cc37",
  storageBucket: "login-auth-9cc37.appspot.com", // ✅ fixed here
  messagingSenderId: "812038632828",
  appId: "1:812038632828:web:059ae4c3c9070a857ee0f9",
  measurementId: "G-GSG13NK78W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
