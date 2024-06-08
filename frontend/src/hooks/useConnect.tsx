import { useEffect, useState } from "react";
import refreshToken from "../utils/refreshToken";

const useConnect = () => {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await refreshToken();
        setConnection(true);
      } catch (err) {
        localStorage.clear();
      }
    })();
  }, []);

  return {
    connection,
    setConnection,
  };
};

export default useConnect;
