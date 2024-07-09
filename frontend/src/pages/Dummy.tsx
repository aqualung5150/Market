import { useEffect, useState } from "react";
import Login from "../features/auth/components/Login";
import Modal from "../components/Modal";
import { axiosInstance } from "../data/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
// import useChatSocket from "../features/chat/hooks/useChatSocket";
import Button from "../components/Button";
import { User } from "../types/user";

const Dummy = () => {
  const [data, setData] = useState<User>();
  const userId = useSelector((state: RootState) => state.user.id);
  // const { connection, setConnection } = useContext(ConnectionContext);

  useEffect(() => {
    if (!userId) return;
    // fetching some data...
    axiosInstance
      .get("/users/me")
      .then((res) => {
        setData(res.data);
        // setConnection(true);
      })
      .catch((err) => console.log("리프레시토큰 만료 - " + err.message));
  }, []);

  // const chatSocket = useChatSocket();

  return (
    <div>
      {/* {userId ? (
        <div>${data?.name}</div>
      ) : (
        <Modal children={<Login />} open={true} />
      )} */}

      {/* <Button
        text="emit"
        onClick={() => {
          chatSocket?.emit("hello", "it's me");
        }}
      /> */}
    </div>
  );
};

export default Dummy;
