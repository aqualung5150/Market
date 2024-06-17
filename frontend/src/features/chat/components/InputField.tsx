import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { InputFieldProps } from "../../../@types/chat";
import Input from "../../../components/Input";

const InputField = ({
  socket,
  channelId,
  setCreated,
  toUserId,
  type,
}: InputFieldProps) => {
  const [value, setValue] = useState<string>("");

  const sendMessage = useCallback(
    (message: string, channelId: number) => {
      console.log("sendMessageReq", message);
      socket?.emit("sendMessageReq", {
        body: message, // useCallback에서 value가 적절히 들어가는가
        channelId: channelId,
      });
      setValue("");
    },
    [socket]
  );

  const createChannel = useCallback(
    (message: string, toUserId: number) => {
      socket?.emit("createChannelReq", {
        body: message,
        toUserId: toUserId,
      });
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
            if (type === "send" && channelId) {
              sendMessage(value, channelId);
            } else if (type === "create" && toUserId && setCreated) {
              setCreated(true);
              createChannel(value, toUserId);
            }
          }}
        />
        <Button
          text="전송"
          onClick={() => {
            if (type === "send" && channelId) {
              sendMessage(value, channelId);
            } else if (type === "create" && toUserId && setCreated) {
              setCreated(true);
              createChannel(value, toUserId);
            }
          }}
        />
      </div>
    </div>
  );
};

export default InputField;
