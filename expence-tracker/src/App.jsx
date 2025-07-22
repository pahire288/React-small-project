import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function AppContent() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleActivatePremium = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      expenses.map((e) => e.amount).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", minHeight: "100vh", padding: "20px" }}>
      <h1>Expense Tracker</h1>
      <ExpenseForm />
      <ExpenseList />
      <h3>Total Expenses: Rs. {totalExpenses}</h3>

      {totalExpenses > 10000 && (
        <>
          <button onClick={handleActivatePremium}>Activate Premium</button>
          <button onClick={handleDownload}>Download CSV</button>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
