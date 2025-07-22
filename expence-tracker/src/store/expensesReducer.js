const initialState = {
  expenses: [],
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "SET_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };
    default:
      return state;
  }
};

export default expensesReducer;
