import { useEffect, useState } from "react";
import refreshToken from "../utils/refreshToken";
import { Socket, io } from "socket.io-client";
import { jwt } from "../data/jwt";
import axios from "axios";
import setLocalStorage from "../utils/setLocalStorage";

const useConnect = () => {
  const [connection, setConnection] = useState(false);
  const [chatSocket, setChatSocket] = useState<Socket>();

  useEffect(() => {
    const connectSocket = () => {
      const nickname = localStorage.getItem("nickname");
      const token = jwt.getToken();
      if (nickname && token) {
        const connection = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
          query: { nickname: nickname },
          auth: { token: token },
          transports: ["websocket"],
        });
        return connection;
      }
    };

    const getToken = async () => {
      try {
        await refreshToken();
        const socketConnection = connectSocket();
        setConnection(true);
        setChatSocket(socketConnection);
      } catch (err) {
        localStorage.clear();
      }
    };

    getToken();

    return () => {
      if (chatSocket?.connected) chatSocket.disconnect();
      jwt.setToken("");
    };
  }, []);

  return {
    connection,
    setConnection,
    chatSocket,
  };
};

export default useConnect;
