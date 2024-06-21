import { useState } from "react";
import Input from "../../../components/Input";
import { NewChatProps } from "../../../@types/chat";

const NewChat = ({ socket, sendTo }: NewChatProps) => {
  const [value, setValue] = useState<string>("");

  const createChannel = (message: string, to: number) => {
    socket?.emit("createChannelReq", { body: message, sendTo: to });
  };

  return (
    <div>
      <Input
        value={value}
        placeholder="메세지를 입력하세요."
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onEnter={() => {
          createChannel(value, sendTo);
        }}
      />
    </div>
  );
};

export default NewChat;
