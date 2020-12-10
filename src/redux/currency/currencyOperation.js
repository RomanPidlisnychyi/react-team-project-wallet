import { CURRENCY_API_URL } from "../../constants";
import { setCurrencyExchange } from "./currencyAction";

export const currencyExchangeOperation = () => async (dispatch) => {
  try {
    const response = await fetch(CURRENCY_API_URL);
    const currency = await response.json();

    dispatch(setCurrencyExchange(currency));
  } catch (error) {
    console.log(error);
  }
};
