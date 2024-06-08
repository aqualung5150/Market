import { useEffect, useState } from "react";
import refreshToken from "../utils/refreshToken";

const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await refreshToken();
        setLoggedIn(true);
      } catch (err) {
        localStorage.clear();
      }
    })();
  }, []);

  return {
    loggedIn,
    setLoggedIn,
  };
};

export default useLoggedIn;
