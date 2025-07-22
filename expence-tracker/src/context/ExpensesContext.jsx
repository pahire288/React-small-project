import React, { createContext, useReducer } from "react";
import { expensesReducer, initialExpensesState } from "../reducers/expensesReducer";

export const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialExpensesState);

  return (
    <ExpensesContext.Provider value={{ expensesState, dispatch }}>
      {children}
    </ExpensesContext.Provider>
  );
};
