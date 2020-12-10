import { API_URL } from "../../constants";

import { loadingTransaction, setBalance, setTransactions } from "./transactionsActions";

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import { defaults } from "@pnotify/core";
import { info, defaultModules } from "@pnotify/core";

defaults.width = "350px";
defaults.delay = 2000;
defaultModules.set(PNotifyMobile, {});

export const createTransaction = (userId, token, transaction) => async (
  dispatch
) => {
  try {
    const url = `${API_URL}/api/finance/${userId}`;

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    };

    const response = await fetch(url, options);
    const { finance: { totalBalance, data }} = await response.json();

    dispatch(setBalance(totalBalance));
    dispatch(setTransactions(data));
  } catch (error) {
    info({
      text: error,
    });
  }
};

export const getTransactions = (userId, token) => async (dispatch) => {
  dispatch(loadingTransaction(true));
  try {
    const url = `${API_URL}/api/finance/${userId}`;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const { finance: { totalBalance, data }} = await response.json();

    dispatch(setBalance(totalBalance));
    dispatch(setTransactions(data));
    dispatch(loadingTransaction(false))
  } catch (error) {
    info({
      text: error,
    });
    dispatch(loadingTransaction(false))
  }
};