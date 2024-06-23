import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Input from "../../../components/Input";
import { useContext, useState } from "react";
import { SocketContext } from "../../../context/SocketContext";

const EmptyRoom = () => {
  const [value, setValue] = useState("");
  const socket = useContext(SocketContext).socket;
  const sendTo = useSelector((state: RootState) => state.chat.sendTo);

  const createChannel = (message: string, to: number) => {
    socket?.emit("createChannelReq", { body: message, sendTo: to });
  };

  return (
    <div className="w-2/3 flex justify-center items-center">
      {sendTo ? (
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
      ) : (
        <div>no room</div>
      )}
    </div>
  );
};

export default EmptyRoom;
