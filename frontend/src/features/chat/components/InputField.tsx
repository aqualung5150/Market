import React, { useCallback, useContext, useState } from "react";
import Input from "../../../components/Input";
import { SocketContext } from "../../../context/SocketContext";
import { InputFieldProps } from "../../../types/chat";
import { ReactComponent as SendIcon } from "../../../assets/send.svg";

const InputField = ({ channelId }: InputFieldProps) => {
  const [value, setValue] = useState<string>("");
  const socket = useContext(SocketContext).socket;

  const sendMessage = useCallback(
    (message: string, channelId: number) => {
      if (message.length === 0) return;
      socket?.emit("sendMessageReq", {
        body: message,
        channelId: channelId,
      });
      setValue("");
    },
    [socket],
  );

  return (
    <div className="flex items-center gap-4 bg-gray-100 px-4 py-3">
      <div className="flex-1">
        <Input
          value={value}
          placeholder="메세지를 입력하세요."
          onChange={(e) => setValue(e.target.value)}
          onEnter={() => sendMessage(value, channelId)}
        />
      </div>
      <SendIcon
        className="h-9 w-9 stroke-sky-400"
        onClick={() => sendMessage(value, channelId)}
      />
    </div>
  );
};

export default React.memo(InputField);
