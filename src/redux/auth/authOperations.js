import { API_URL } from '../../constants';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { defaults } from '@pnotify/core';
import { info, defaultModules } from '@pnotify/core';

import { setUserData, setToken, loadingAcc } from './authActions';
import { setOutCurrencyExchange } from '../currency/currencyAction';
import { setOutTransactions } from '../transactions/transactionsActions';

defaults.width = '350px';
defaults.delay = 2000;
defaultModules.set(PNotifyMobile, {});

export const requestSingIn = payload => async dispatch => {
  dispatch(loadingAcc(true));
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { token, user } = await response.json();

    if (!user) {
      info({
        text: 'Incorrect E-mail or password.',
      });
    }

    dispatch(setToken(token));
    dispatch(setUserData(user));
    saveTokenToStorage({ token, user: JSON.stringify(user) });
    dispatch(loadingAcc(false));
  } catch (error) {
    info({
      text: error,
    });
    dispatch(loadingAcc(false));
  }
};

export const requestSingUp = payload => async dispatch => {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { success } = await response.json();

    if (!success) {
      info({
        text: 'This E-mail already exist!',
      });

      return;
    }

    const user = {
      email: payload.email,
      password: payload.password,
    };

    saveTokenToStorage({ user: JSON.stringify(user) });

    info({
      text: `Registration successfully!`,
    });

    return success;
  } catch (error) {
    info({
      text: error,
    });
  }
};

export const getTokenFromStorage = () => dispatch => {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    dispatch(setToken(token));
    dispatch(setUserData(user));
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => dispatch => {
  const token = '';
  const user = {};

  dispatch(setToken(token));
  dispatch(setUserData(user));
  dispatch(setOutCurrencyExchange());
  dispatch(setOutTransactions());

  saveTokenToStorage({ token, user: JSON.stringify(user) });
};

export const saveTokenToStorage = ({ user, token }) => {
  localStorage.setItem('user', user);
  localStorage.setItem('token', token);
};
