import { useCallback, useContext, useState } from "react";
import Input from "../../../components/Input";
import { SocketContext } from "../../../context/SocketContext";
import { InputFieldProps } from "../../../@types/chat";

const InputField = ({ channelId }: InputFieldProps) => {
  const [value, setValue] = useState<string>("");
  const socket = useContext(SocketContext).socket;

  const sendMessage = useCallback(
    (message: string, channelId: number) => {
      socket?.emit("sendMessageReq", {
        body: message,
        channelId: channelId,
      });
      setValue("");
    },
    [socket]
  );

  return (
    <div className="bg-gray-100 px-4 py-4 flex items-center">
      <div className="flex-1 mx-4">
        <Input
          value={value}
          placeholder="메세지를 입력하세요."
          onChange={(e) => setValue(e.target.value)}
          onEnter={() => sendMessage(value, channelId)}
        />
      </div>
    </div>
  );
};

export default InputField;
