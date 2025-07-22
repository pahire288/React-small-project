import React, { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext";

const PremiumButton = () => {
  const { expensesState } = useContext(ExpensesContext);

  if (!expensesState.isPremium) return null;

  return (
    <button style={{ backgroundColor: "gold", padding: "10px", fontWeight: "bold" }}>
      Activate Premium
    </button>
  );
};

export default PremiumButton;
