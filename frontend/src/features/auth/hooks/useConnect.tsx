import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../data/axiosInstance";
import { RootState } from "../../../app/store";
import chatSocket from "../../chat/chatSocket";
import { Socket, io } from "socket.io-client";

const useConnect = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.id) {
      console.log("no user id");
      return;
    }

    const initialConnect = async () => {
      try {
        await axiosInstance.post("auth/check");
        console.log("연결시도: " + user.id);

        setSocket(
          io(`${process.env.REACT_APP_BASE_URL}/chat`, {
            query: { nickname: user.nickname },
            transports: ["websocket"],
          })
        );

        // chatSocket.connectSocket({ nickname: user.nickname });
      } catch (err) {
        // dispatch(resetUser());
      }
    };

    initialConnect();

    return () => {
      chatSocket.disconnectSocket();
    };
  }, [user.id]);

  return { socket };
};

export default useConnect;
