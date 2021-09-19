export const AUTH_KEY = "__auth_token__";

export const setToken = (item: string) =>
  window.localStorage.setItem(AUTH_KEY, item);
export const getToken = () => window.localStorage.getItem(AUTH_KEY);
export const removeToken = () => window.localStorage.removeItem(AUTH_KEY);
