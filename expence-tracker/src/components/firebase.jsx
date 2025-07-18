// src/firebase.js

// Import necessary functions
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC44GiGCfzmvLH1iqYKqsyHuOjHYrEG_b0",
  authDomain: "movie-app-ba885.firebaseapp.com",
  databaseURL: "https://movie-app-ba885-default-rtdb.firebaseio.com",
  projectId: "movie-app-ba885",
  storageBucket: "movie-app-ba885.appspot.com", // Corrected .app to .appspot.com
  messagingSenderId: "465916271383",
  appId: "1:465916271383:web:ca0df766235b5086f83552",
  measurementId: "G-8JK8HHKGD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export database and auth
export const db = getDatabase(app);
export const auth = getAuth(app);
