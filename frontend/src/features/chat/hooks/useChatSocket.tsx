import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { RootState } from "../../../app/store";
import useAuthCheck from "../../auth/hooks/useAuthCheck";

const useChatSocket = () => {
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const user = useSelector((state: RootState) => state.user);

  useAuthCheck();

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
      query: { nickname: user.nickname },
      transports: ["websocket"],
    });

    socket.on("getChannelsRes", (payload) => {
      console.log("getChannelsRes");
    });

    socket.on("getChannelRes", (payload) => {
      console.log("getChannelsRes");
    });

    socket.on("getMessagesRes", (payload) => {
      console.log("getMessagesRes");
    });

    setChatSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return chatSocket;
};

export default useChatSocket;
