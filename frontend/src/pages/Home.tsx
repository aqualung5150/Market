import { useState } from "react";
import Chat from "../features/chat/components/Chat";
import Button from "../components/Button";
import Input from "../components/Input";

const Home = () => {
  const [openChat, setOpenChat] = useState(false);
  const [initToUserId, setInitToUserId] = useState(0);
  return (
    <div>
      <h1>This is Home.</h1>
      <Button text="initToUserID to 6" onClick={() => setInitToUserId(6)} />
      <Button text="initToUserID to 0" onClick={() => setInitToUserId(0)} />

      <Button text="Chat normal" onClick={() => setOpenChat((prev) => !prev)} />
      {openChat && <Chat initToUserId={initToUserId} />}
    </div>
  );
};

export default Home;
