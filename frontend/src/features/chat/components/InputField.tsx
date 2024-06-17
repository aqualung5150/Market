import { useCallback, useContext, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { SocketContext } from "../../../context/SocketContext";
import { InputFieldProps } from "../../../@types/chat";

const InputField = ({ channelId }: InputFieldProps) => {
  const [value, setValue] = useState<string>("");
  const socket = useContext(SocketContext).socket;

  const sendMessage = useCallback(
    (message: string, channelId: number) => {
      console.log("sendMessageReq", message);
      socket?.emit("sendMessageReq", {
        body: message,
        channelId: channelId,
      });
      setValue("");
    },
    [socket]
  );

  return (
    <div className="container">
      <div>
        <Input
          value={value}
          placeholder="메세지를 입력하세요"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onEnter={() => {
            sendMessage(value, channelId);
          }}
        />
        <Button
          text="전송"
          onClick={() => {
            sendMessage(value, channelId);
          }}
        />
      </div>
    </div>
  );
};

export default InputField;
