import { combineReducers } from "redux";
import transactionsReducer from "./transactions/transactionsReducer";
import authReducer from "./auth/authReducer";
import currencyReducer from "./currency/currencyReducer";

export default combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  currency: currencyReducer,
});
