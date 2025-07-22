export const initialExpensesState = {
  expenses: [],
  totalAmount: 0,
  isPremium: false,
};

export const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      const updatedExpenses = [...state.expenses, action.payload];
      const updatedTotal = state.totalAmount + Number(action.payload.amount);
      return {
        ...state,
        expenses: updatedExpenses,
        totalAmount: updatedTotal,
        isPremium: updatedTotal > 10000,
      };

    case "SET_EXPENSES":
      const total = action.payload.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0
      );
      return {
        ...state,
        expenses: action.payload,
        totalAmount: total,
        isPremium: total > 10000,
      };

    default:
      return state;
  }
};
