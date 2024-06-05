import { useEffect, useState } from "react";

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const item = localStorage.getItem("isLoggedIn");
    if (item === "true") setIsLoggedIn(true);
  }, []);

  return isLoggedIn;
};

export default useIsLoggedIn;
