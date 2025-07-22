import React from "react";
import { useSelector } from "react-redux";

function ExpenseList() {
  const expenses = useSelector((state) => state.expenses.expenses);
  return (
    <div>
      <h3>Expenses</h3>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>Rs. {exp.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
