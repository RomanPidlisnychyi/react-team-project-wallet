export const isAuthenticateSelector = (state) => Boolean(state.auth.token);
export const userDataSelector = (state) => state.auth.user;
export const userNameSelector = (state) => state.auth.user.name;
export const userIdSelector = (state) => state.auth.user.id;
export const userTokenSelector = (state) => state.auth.token;
export const loadingAccSelector = (state) => state.auth.loading;