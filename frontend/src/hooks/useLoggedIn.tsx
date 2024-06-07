import { useEffect, useState } from "react";
import setLocalStorage from "../utils/setLocalStorage";
import axios from "axios";

const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_BASE_URL}/api/user/me`;
    axios
      .get(url)
      .then((res) => {
        setLoggedIn(true);
        setLocalStorage(res.data);
      })
      .catch((err) => console.log("not yet logged in"));
  }, []);

  return {
    loggedIn,
    setLoggedIn,
  };
};

export default useLoggedIn;
