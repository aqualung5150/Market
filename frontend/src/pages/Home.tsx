import { useState } from "react";
import Chat from "../features/chat/components/Chat";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from "./Home.module.css";

const Home = () => {
  const [openChat, setOpenChat] = useState(false);
  const [initToUserId, setInitToUserId] = useState(0);
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
          onClick={() => setOpenChat((prev) => !prev)}
        />
      </div>
      {openChat && <Chat initToUserId={initToUserId} />}
    </div>
  );
};

export default Home;
