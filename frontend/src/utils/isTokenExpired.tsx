const isTokenExpired = (): boolean => {
  const item = localStorage.getItem("exp");
  if (item) {
    const exp = parseInt(item);
    if (exp * 1000 - 1000 <= Date.now()) return true;
  }
  return false;
};

export default isTokenExpired;
