import React, { useState } from "react";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      amount,
      description,
      category
    };
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <div>
      <h2>Add Daily Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount spent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <h3>Expenses List</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            Rs. {expense.amount} - {expense.description} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseForm;
