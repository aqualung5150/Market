export const jwt = (() => {
  let token: string | undefined = undefined;
  return {
    getToken() {
      return token;
    },
    setToken(input: string) {
      token = input;
    },
  };
})();
