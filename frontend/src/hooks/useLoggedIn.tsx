import { useEffect, useState } from "react";

const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_BASE_URL}/api/user/me`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("not yet logged in");
        setLoggedIn(true);
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("id", data.id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);
        localStorage.setItem("nickname", data.nickname);
        localStorage.setItem("iat", data.iat);
        localStorage.setItem("exp", data.exp);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return {
    loggedIn,
    setLoggedIn,
  };
};

export default useLoggedIn;
