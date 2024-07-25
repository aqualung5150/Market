import { RootState } from "app/store";
import { axiosInstance } from "data/axiosInstance";
import { setNoti } from "features/chat/chatSlice";
import { resetUser, setUser } from "features/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { SocketChannelData, SocketMessageData } from "types/chat";
import isTokenExpired from "utils/isTokenExpired";
import refreshToken from "utils/refreshToken";

const useConnect = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const openChat = useSelector((state: RootState) => state.chat).open;
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그아웃하지 않고 브라우저를 종료한 유저
    if (!user.id) {
      console.log("no user id");
      return;
    }

    const initialConnect = async () => {
      // 쿠키에 남아있는 액세스토큰 만료되었다면 리프레시
      if (isTokenExpired()) {
        try {
          const res = await refreshToken();
          console.log("new token generated");
          dispatch(setUser(res.data));
        } catch (err) {
          // 리프레시토큰까지 만료된 경우
          console.log("refresh token expired");
          dispatch(resetUser());
        }
      }

      // connect socket
      const connection = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
        query: { nickname: user.nickname },
        transports: ["websocket"],
      });

      // reconnect
      connection.on("connect_error", async (err) => {
        console.log(
          `socket.io connect_error - '${err.message}'. reconnecting`,
        );
        setTimeout(async () => {
          if (isTokenExpired()) {
            try {
              const res = await refreshToken();
              console.log("new token generated");
              dispatch(setUser(res.data));
              connection.connect();
            } catch (err) {
              // 리프레시토큰까지 만료된 경우
              console.log("refresh token expired");
              dispatch(resetUser());
            }
          }
        }, 1000);
      });

      setSocket(connection);
    };

    initialConnect();

    return () => {
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
  }, [socket, openChat]);

  return { socket };
};

export default useConnect;
