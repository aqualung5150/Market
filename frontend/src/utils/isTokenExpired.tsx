import store from "../app/store";

const isTokenExpired = (): boolean => {
  /* useAxiosInterceptor 최상단에서 useSelector로 exp(state.user.exp)를
  받아서 인자로 넘겨주면 현재의 exp가 아니라 초기값이 들어가는듯하다.

  인터셉터에 handleError를 등록할때의 시점의 exp가 인자로 넘겨지는 것 같다.
  (클로저 변수 같은건가)
  */
  const exp = store.getState().user.exp;
  if (exp) return exp * 1000 - 1000 <= Date.now();
  return false;
};

export default isTokenExpired;
