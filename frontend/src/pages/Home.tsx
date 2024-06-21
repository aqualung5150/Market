import { useState } from "react";
import Chat from "../features/chat/components/Chat";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setOpenChat } from "../features/chat/chatSlice";

const Home = () => {
  // const [openChat, setOpenChat] = useState(false);
  const [initToUserId, setInitToUserId] = useState(0);
  const openChat = useSelector((state: RootState) => state.chat.open);
  const dispatch = useDispatch();
  return (
    // <div className={styles.home}>
    <div className="flex w-full h-full flex-col">
      {/* <div className={styles.bar}> */}
      <div className="flex h-10 justify-between">
        <h1 className="bg-orange-400">This is Home.</h1>
        <Button text="initToUserID to 6" onClick={() => setInitToUserId(6)} />
        <Button text="initToUserID to 0" onClick={() => setInitToUserId(0)} />

        <Button
          text="Chat normal"
          // onClick={() => setOpenChat((prev) => !prev)}
          onClick={() => dispatch(setOpenChat(true))}
        />
      </div>
      {openChat && <Chat initToUserId={initToUserId} />}
    </div>
  );
};

export default Home;
