import { useEffect, useState, useSyncExternalStore } from "react";
import refreshToken from "../../../utils/refreshToken";
import { Socket, io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../data/axiosInstance";
import { resetUser } from "../../user/userSlice";
import { RootState } from "../../../app/store";
import chatSocket from "../../socket/chatSocket";

const useConnect = () => {
  const [connection, setConnection] = useState(false);
  // const [chatSocket, setChatSocket] = useState<Socket>();

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
        transports: ["websocket"],
      });
      console.log("socket connect try");
      return connection;
    };

    const getToken = async () => {
      try {
        await refreshToken();
        const socketConnection = connectSocket();
        // dispatch(setSocket(socketConnection));
        setConnection(true);
        // setChatSocket(socketConnection);
      } catch (err) {
        localStorage.clear();
      }
    };

    //todo
    const initialConnect = async () => {
      try {
        await axiosInstance.post("auth/check");
        chatSocket.connectSocket({ nickname: "default!!" });
        // const socketConnection = connectSocket();
        // setChatSocket(socketConnection);
      } catch (err) {
        dispatch(resetUser());
      }
    };

    // getToken();
    // const socketConnection = connectSocket();
    // setChatSocket(socketConnection);

    initialConnect();

    return () => {
      chatSocket.disconnectSocket();
      // if (chatSocket?.connected) chatSocket.disconnect();
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
