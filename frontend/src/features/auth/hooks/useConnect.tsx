import { useEffect, useState } from "react";
import refreshToken from "../../../utils/refreshToken";
import { Socket, io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../../data/axiosInstance";
import { resetUser } from "../../user/userSlice";

const useConnect = () => {
  const [connection, setConnection] = useState(false);
  const [chatSocket, setChatSocket] = useState<Socket>();

  // redux 연습
  const dispatch = useDispatch();

  useEffect(() => {
    const connectSocket = () => {
      // const nickname = localStorage.getItem("nickname");
      // const token = jwt.getToken();
      const token = "TOTOKEN";
      // if (nickname && token) {
      const connection = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
        query: { nickname: "default" },
        auth: { token: token },
        transports: ["websocket"],
      });
      console.log("socket connect try");
      return connection;
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

    //todo
    const initialConnect = async () => {
      try {
        await axiosInstance.post("auth/check");
        const socketConnection = connectSocket();
        setChatSocket(socketConnection);
      } catch (err) {
        dispatch(resetUser());
      }
    };

    // getToken();
    // const socketConnection = connectSocket();
    // setChatSocket(socketConnection);

    initialConnect();

    return () => {
      if (chatSocket?.connected) chatSocket.disconnect();
      // jwt.setToken("");
    };
  }, []);

  return {
    connection,
    setConnection,
    chatSocket,
  };
};

export default useConnect;
