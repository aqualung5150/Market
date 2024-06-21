import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../data/axiosInstance";
import { RootState } from "../../../app/store";
import chatSocket from "../../chat/chatSocket";
import { Socket, io } from "socket.io-client";
import { setNoti } from "../../chat/chatSlice";
import { SocketMessageData } from "../../../@types/chat";

const useConnect = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const chat = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id) {
      console.log("no user id");
      return;
    }

    const initialConnect = async () => {
      try {
        await axiosInstance.post("auth/check");
        console.log("연결시도: " + user.id);

        const connection = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
          query: { nickname: user.nickname },
          transports: ["websocket"],
        });

        setSocket(connection);
      } catch (err) {}
    };

    initialConnect();

    return () => {
      chatSocket.disconnectSocket();
    };
  }, [user.id]);

  useEffect(() => {
    const eventNoti = (message: SocketMessageData) => {
      console.log(chat.open);
      if (message.sender.id !== user.id && !chat.open) dispatch(setNoti(true));
    };
    socket?.on("sendMessageRes", eventNoti);
    return () => {
      socket?.off("sendMessageRes", eventNoti);
    };
  }, [socket, chat.open]);

  return { socket };
};

export default useConnect;
