import React, { useEffect, useState } from "react";
import { db, auth } from "./components/firebase";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/Login";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const expensesRef = ref(db, "expenses");
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedExpenses = [];

      for (let id in data) {
        loadedExpenses.push({
          id,
          ...data[id],
        });
      }

      setExpenses(loadedExpenses);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Welcome, {user.email} <button onClick={handleLogout}>Logout</button></p>

      <ExpenseForm />
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.amount} - {exp.description} ({exp.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
