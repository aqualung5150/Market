export const jwt = (() => {
  let token: string;
  return {
    getToken() {
      return token;
    },
    setToken(input: string) {
      token = input;
    },
  };
})();
