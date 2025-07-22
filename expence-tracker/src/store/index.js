import { createStore, combineReducers } from "redux";
import authReducer from "./authReducer";
import expensesReducer from "./expensesReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  theme: themeReducer,
});

const store = createStore(rootReducer);

export default store;
