import { SET_CURRENCY_EXCHANGE } from './currencyActionTypes';
import { SET_OUT_CURRENCY_EXCHANGE } from './currencyActionTypes';

const initialState = [];

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCY_EXCHANGE:
      return action.payload;
    case SET_OUT_CURRENCY_EXCHANGE:
      return initialState;
    default:
      return state;
  }
};

export default currencyReducer;
