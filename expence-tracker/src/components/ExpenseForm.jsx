import React, { useState } from "react";
import { useDispatch } from "react-redux";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { id: Date.now(), amount: +amount };
    dispatch({ type: "ADD_EXPENSE", payload: newExpense });
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter expense"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
