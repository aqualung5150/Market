const isLoggedIn = () => {
  if (localStorage.getItem("isLoggedIn") === "true") return true;
  else return false;
};

export default isLoggedIn;
