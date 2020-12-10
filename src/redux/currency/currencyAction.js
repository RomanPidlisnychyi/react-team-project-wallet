import { SET_CURRENCY_EXCHANGE } from './currencyActionTypes';
import { SET_OUT_CURRENCY_EXCHANGE } from './currencyActionTypes';

export const setCurrencyExchange = payload => ({
  type: SET_CURRENCY_EXCHANGE,
  payload,
});

export const setOutCurrencyExchange = () => ({
  type: SET_OUT_CURRENCY_EXCHANGE,
});
