import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC44GiGCfzmvLH1iqYKqsyHuOjHYrEG_b0",
  authDomain: "movie-app-ba885.firebaseapp.com",
  databaseURL: "https://movie-app-ba885-default-rtdb.firebaseio.com",
  projectId: "movie-app-ba885",
  storageBucket: "movie-app-ba885.appspot.com",
  messagingSenderId: "465916271383",
  appId: "1:465916271383:web:ca0df766235b5086f83552",
  measurementId: "G-8JK8HHKGD0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
