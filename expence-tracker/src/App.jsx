import React, { useEffect, useState } from "react";
import "./index.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expenses
  const fetchExpenses = async () => {
    const res = await fetch("https://movie-app-ba885-default-rtdb.firebaseio.com/expenses.json");
    const data = await res.json();
    const loadedExpenses = [];
    for (const key in data) {
      loadedExpenses.push({
        id: key,
        title: data[key].title,
        amount: data[key].amount,
      });
    }
    setExpenses(loadedExpenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add new expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { title, amount };

    await fetch("https://movie-app-ba885-default-rtdb.firebaseio.com/expenses.json", {
      method: "POST",
      body: JSON.stringify(newExpense),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
    setAmount("");
    fetchExpenses();
  };

  // Delete expense
  const handleDelete = async (id) => {
    await fetch(`https://movie-app-ba885-default-rtdb.firebaseio.com/expenses/${id}.json`, {
      method: "DELETE",
    });
    console.log("Expense successfully deleted");
    fetchExpenses();
  };

  // Start editing
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setTitle(expense.title);
    setAmount(expense.amount);
  };

  // Update expense
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedExpense = { title, amount };

    await fetch(`https://movie-app-ba885-default-rtdb.firebaseio.com/expenses/${editingExpense.id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedExpense),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Expense successfully updated");
    setEditingExpense(null);
    setTitle("");
    setAmount("");
    fetchExpenses();
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={editingExpense ? handleUpdate : handleSubmit}>
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">{editingExpense ? "Update Expense" : "Add Expense"}</button>
      </form>

      <h2>Expenses</h2>
      {expenses.length === 0 && <p>No expenses found</p>}
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          <span>{expense.title} - ₹{expense.amount}</span>
          <button onClick={() => handleEdit(expense)}>Edit</button>
          <button onClick={() => handleDelete(expense.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
