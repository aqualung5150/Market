import store from "../app/store";

const isTokenExpired = (): boolean => {
  const exp = store.getState().user.exp;
  if (exp) return exp * 1000 - 1000 <= Date.now();
  return false;
};

export default isTokenExpired;
