import { RootState } from "app/store";
import Input from "components/Input";
import { SocketContext } from "context/SocketContext";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

const EmptyRoom = () => {
  const [value, setValue] = useState("");
  const socket = useContext(SocketContext).socket;
  const sendTo = useSelector((state: RootState) => state.chat.sendTo);

  const createChannel = (message: string, to: number) => {
    socket?.emit("createChannelReq", { body: message, sendTo: to });
  };

  return (
    <div className="flex w-2/3 items-center justify-center">
      {sendTo ? (
        <Input
          value={value}
          placeholder="메세지를 입력하세요."
          onChange={(e) => setValue(e.target.value)}
          onEnter={() => createChannel(value, sendTo)}
        />
      ) : (
        <div>no room</div>
      )}
    </div>
  );
};

export default EmptyRoom;
