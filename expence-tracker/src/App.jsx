import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ExpensesProvider } from "./context/ExpensesContext";
import ExpenseForm from "./components/ExpenseForm";
import PremiumButton from "./components/PremiumButton";

function App() {
  return (
    <AuthProvider>
      <ExpensesProvider>
        <div style={{ textAlign: "center" }}>
          <h1>Expense Tracker</h1>
          <ExpenseForm />
          <PremiumButton />
        </div>
      </ExpensesProvider>
    </AuthProvider>
  );
}

export default App;
