// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCLG6SNrktjzMr10g5H9D9Dmsp8N5bsCKY",
  authDomain: "login-auth-9cc37.firebaseapp.com",
  databaseURL: "https://login-auth-9cc37-default-rtdb.firebaseio.com",
  projectId: "login-auth-9cc37",
  storageBucket: "login-auth-9cc37.appspot.com",
  messagingSenderId: "812038632828",
  appId: "1:812038632828:web:059ae4c3c9070a857ee0f9",
  measurementId: "G-GSG13NK78W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
