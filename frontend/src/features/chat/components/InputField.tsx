import { useCallback, useState } from "react";
import Button from "../../../components/Button";
import { InputFieldProps } from "../../../@types/chat";
import Input from "../../../components/Input";

const InputField = ({ socket, channelId }: InputFieldProps) => {
  const [value, setValue] = useState<string>("");

  const sendMessage = useCallback(
    (message: string, channelId: number) => {
      console.log("sendMessage", message);
      socket?.emit("sendMessage", {
        body: message, // useCallback에서 value가 적절히 들어가는가
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
