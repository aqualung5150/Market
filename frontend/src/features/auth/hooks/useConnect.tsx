import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../data/axiosInstance";
import { RootState } from "../../../app/store";
import { Socket, io } from "socket.io-client";
import { setNoti } from "../../chat/chatSlice";
import { SocketChannelData, SocketMessageData } from "../../../@types/chat";

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
      // chatSocket.disconnectSocket();
      socket?.disconnect();
    };
  }, [user.id]);

  useEffect(() => {
    const messageNoti = (message: SocketMessageData) => {
      if (message.sender.id !== user.id && !chat.open) dispatch(setNoti(true));
    };

    const channelNoti = (channel: SocketChannelData) => {
      if (channel.senderId !== user.id && !chat.open) dispatch(setNoti(true));
    };

    socket?.on("sendMessageRes", messageNoti);
    socket?.on("getChannelRes", channelNoti);
    return () => {
      socket?.off("sendMessageRes", messageNoti);
      socket?.on("getChannelRes", channelNoti);
    };
  }, [socket, chat.open]);

  return { socket };
};

export default useConnect;
