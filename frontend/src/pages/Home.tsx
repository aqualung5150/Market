import { useState } from "react";
import Chat from "../features/chat/components/Chat";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setOpenChat, setSendTo } from "../features/chat/chatSlice";

const Home = () => {
  const openChat = useSelector((state: RootState) => state.chat.open);
  const dispatch = useDispatch();
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-10">
        <Button
          text="Message to id: 6"
          onClick={() => {
            dispatch(setOpenChat(true));
            dispatch(setSendTo(6));
          }}
        />
      </div>
      {openChat && <Chat />}
    </div>
  );
};

export default Home;
