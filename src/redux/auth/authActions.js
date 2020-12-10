import { SET_USER_DATA, SET_TOKEN, LOADING_ACC } from "./authTypes";

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
});
export const loadingAcc = (payload) => ({
  type: LOADING_ACC,
  payload,
})