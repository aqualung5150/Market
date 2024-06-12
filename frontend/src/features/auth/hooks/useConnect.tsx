import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../data/axiosInstance";
import { RootState } from "../../../app/store";
import chatSocket from "../../socket/chatSocket";

const useConnect = () => {
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    if (!userId) {
      console.log("no userId");
      return;
    }

    const initialConnect = async () => {
      try {
        await axiosInstance.post("auth/check");
        console.log("연결시도: " + userId);
        chatSocket.connectSocket({ nickname: "맥북살까" });
      } catch (err) {
        // dispatch(resetUser());
      }
    };

    initialConnect();

    return () => {
      chatSocket.disconnectSocket();
    };
  }, [userId]);
};

export default useConnect;
