import {
  SET_TRANSACTIONS,
  SET_OUT_TRANSACTIONS,
  SET_BALANCE,
  SET_FILTER,
  LOADING_TRANSACTIONS,
} from "./transactionsActionTypes";

const initialState = {
  items: [],
  balance: 0,
  loading: false,
  filter: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { ...state, items: action.payload };
    case SET_OUT_TRANSACTIONS:
      return initialState;
    case SET_BALANCE:
      return { ...state, balance: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case LOADING_TRANSACTIONS: 
      return { ...state, loading: action.payload};
    default:
      return state;
  }
};

export default reducer;
