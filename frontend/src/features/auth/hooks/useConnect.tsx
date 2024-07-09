import { RootState } from "app/store";
import { axiosInstance } from "data/axiosInstance";
import { setNoti } from "features/chat/chatSlice";
import { resetUser } from "features/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { SocketChannelData, SocketMessageData } from "types/chat";

const useConnect = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const openChat = useSelector((state: RootState) => state.chat).open;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id) {
      console.log("no user id");
      return;
    }

    const initialConnect = async () => {
      try {
        // 스토리지에 userId가 있다면 연결시도
        await axiosInstance.post("auth/check");
        console.log("연결시도: " + user.id);

        const connection = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
          query: { nickname: user.nickname },
          transports: ["websocket"],
        });

        setSocket(connection);
      } catch (err) {
        // userId는 있지만 실제 연결되어 있지는 않은 상황
        dispatch(resetUser());
      }
    };

    initialConnect();

    return () => {
      // chatSocket.disconnectSocket();
      socket?.disconnect();
    };
  }, [user.id]);

  useEffect(() => {
    const messageNoti = (message: SocketMessageData) => {
      if (message.sender.id !== user.id && !openChat) dispatch(setNoti(true));
    };

    const channelNoti = (channel: SocketChannelData) => {
      if (channel.senderId !== user.id && !openChat) dispatch(setNoti(true));
    };

    socket?.on("sendMessageRes", messageNoti);
    socket?.on("getChannelRes", channelNoti);
    return () => {
      socket?.off("sendMessageRes", messageNoti);
      socket?.on("getChannelRes", channelNoti);
    };
  }, [socket, openChat, dispatch]);

  return { socket };
};

export default useConnect;
