import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { ConnectionContext } from "../context/ConnectionContext";
import Modal from "../components/Modal";
import Login from "../features/auth/components/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateUser } from "../features/user/userSlice";
// import chatSocket from "../features/chat/chatSocket";
import { Socket } from "socket.io-client";
import { SocketContext } from "../context/SocketContext";
import { SocketContextProps } from "../@types/context.d";
// import useChatSocket from "../features/chat/hooks/useChatSocket";
import useAuthCheck from "../features/auth/hooks/useAuthCheck";

const Foo = () => {
  // useAuthCheck();

  const [modalOpen, setModalOpen] = useState(false);
  // const [socket, setSocket] = useState<Socket | null>(chatSocket.getSocket());
  // const { connection } = useContext(ConnectionContext);

  const user = useSelector((state: RootState) => state.user);
  // const socket = useContext(SocketContext).socket;
  // const socket = chatSocket.getSocket();
  const dispatch = useDispatch();

  // const chatSocket = useChatSocket();

  // socket?.on("hello", (payload: string) => {
  //   console.log(payload);
  // });

  // useEffect(() => {
  //   // socket?.on("hello", (payload: string) => {
  //   //   console.log(payload);
  //   // });
  // }, [socket]);

  // useEffect(() => {
  //   // if (chatSocket.getSocket()) {
  //   //   setSocket(chatSocket.getSocket());
  //   //   console.log("set socket");
  //   // }

  //   if (!socket) {
  //     console.log("useEFFECT");
  //     return;
  //   }

  //   socket.on("hello", (payload) => {
  //     console.log("on: " + payload);
  //   });
  // }, [socket]);

  return (
    <div>
      {user.id && <h1>login!</h1>}
      <h2>{user.name}</h2>
      <Button text="test" />
      {/* <Button
        text="socket.emit(it's me)"
        onClick={() => {
          console.log("connected: ", chatSocket?.connected);
          chatSocket?.emit("hello", "it's me");
        }}
      /> */}
      <Button
        text="승준"
        onClick={() => {
          dispatch(updateUser({ name: "최승준" }));
        }}
      />
      <h1>Foo, the second test</h1>
      <Modal
        children={<Login />}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Button
        text="글쓰기"
        onClick={() => (user.id ? alert("글 작성완료!!") : setModalOpen(true))}
      />
    </div>
  );
};

export default Foo;
