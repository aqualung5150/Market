const isTokenExpired = (exp: number | null): boolean => {
  if (exp) return exp * 1000 - 1000 <= Date.now();
  return false;
};

export default isTokenExpired;
