import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../data/axiosInstance";
import { RootState } from "../../../app/store";
import chatSocket from "../../socket/chatSocket";

const useConnect = () => {
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
        chatSocket.connectSocket({ nickname: user.nickname });
      } catch (err) {
        // dispatch(resetUser());
      }
    };

    initialConnect();

    return () => {
      chatSocket.disconnectSocket();
    };
  }, [user.id]);
};

export default useConnect;
