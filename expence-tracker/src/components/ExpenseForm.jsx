import React, { useState, useContext } from "react";
import { db } from "../firebase";
import { ref, push } from "firebase/database";
import { ExpensesContext } from "../context/ExpensesContext";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { dispatch } = useContext(ExpensesContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = { amount, description, category };

    try {
      await push(ref(db, "expenses"), newExpense);
      console.log("Expense saved successfully");

      dispatch({ type: "ADD_EXPENSE", payload: newExpense });

      setAmount("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
